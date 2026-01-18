import { defineCommand } from 'citty'
import { handleError, getFileKey, getParentGUID, sendCommand } from '../client.ts'
import { ok, fail } from '../format.ts'
import { resolve } from 'path'
import { existsSync, writeFileSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import * as React from 'react'
import { renderToNodeChanges, INTRINSIC_ELEMENTS, loadVariablesIntoRegistry, isRegistryLoaded } from '../render/index.ts'
import { transformSync } from 'esbuild'

const PROXY_URL = process.env.FIGMA_PROXY_URL || 'http://localhost:38451'

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of process.stdin) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf-8')
}

function findNodeModulesDir(): string | null {
  let dir = import.meta.dir
  for (let i = 0; i < 10; i++) {
    if (existsSync(join(dir, 'node_modules', 'react'))) {
      return dir
    }
    const parent = resolve(dir, '..')
    if (parent === dir) break
    dir = parent
  }
  return null
}

// Map PascalCase component names to lowercase intrinsic elements via esbuild define
const JSX_DEFINE = Object.fromEntries(
  INTRINSIC_ELEMENTS.map(name => [name, JSON.stringify(name.toLowerCase())])
)

/**
 * Transform JSX snippet to ES module using esbuild.
 * PascalCase components (Frame, Text, etc.) are converted to lowercase intrinsic elements.
 */
function transformJsxSnippet(code: string): string {
  const snippet = code.trim()
  const isModule = snippet.includes('import ') || snippet.includes('export ')
  
  // Wrap snippet in factory function, or use module as-is
  const fullCode = isModule ? snippet : `export default (React) => () => (${snippet});`
  
  const result = transformSync(fullCode, {
    loader: 'tsx',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    define: JSX_DEFINE,
  })
  
  return result.code
}

export default defineCommand({
  meta: { 
    description: 'Render React component to Figma via WebSocket',
  },
  args: {
    file: { type: 'positional', description: 'TSX/JSX file path', required: false },
    stdin: { type: 'boolean', description: 'Read TSX from stdin' },
    props: { type: 'string', description: 'JSON props to pass to component' },
    parent: { type: 'string', description: 'Parent node ID (sessionID:localID)' },
    export: { type: 'string', description: 'Named export (default: default)' },
    json: { type: 'boolean', description: 'Output as JSON' },
    dryRun: { type: 'boolean', description: 'Output NodeChanges without sending to Figma' },
  },
  async run({ args }) {
    let filePath: string
    let tempFile: string | null = null
    
    // Handle stdin or file
    if (args.stdin) {
      let code = await readStdin()
      if (!code.trim()) {
        console.error(fail('No input received from stdin'))
        process.exit(1)
      }
      
      // Transform JSX snippet to factory function
      code = transformJsxSnippet(code)
      
      // Write temp file
      const baseDir = findNodeModulesDir() || tmpdir()
      tempFile = join(baseDir, `.figma-render-${Date.now()}.js`)
      writeFileSync(tempFile, code)
      filePath = tempFile
    } else if (args.file) {
      filePath = resolve(args.file)
      
      if (!existsSync(filePath)) {
        console.error(fail(`File not found: ${filePath}`))
        process.exit(1)
      }
    } else {
      console.error(fail('Provide a file path or use --stdin'))
      process.exit(1)
    }
    
    try {
      // Import TSX file directly - Bun handles transpilation
      const module = await import(filePath)
      
      const exportName = args.export || 'default'
      let Component = module[exportName]
      
      // If it's a factory (from stdin wrapper), call it with our React
      if (typeof Component === 'function' && Component.length === 1 && args.stdin) {
        Component = Component(React)
      }
      
      if (!Component) {
        console.error(fail(`Export "${exportName}" not found`))
        process.exit(1)
      }
      
      // Get file key from DevTools
      let fileKey: string
      try {
        fileKey = await getFileKey()
      } catch {
        console.error(fail('Cannot connect to Chrome DevTools on port 9222'))
        console.error('')
        console.error('Start Figma with remote debugging enabled:')
        console.error('  figma --remote-debugging-port=9222')
        process.exit(1)
      }
      
      const parentGUID = args.parent 
        ? parseGUID(args.parent)
        : await getParentGUID()
      
      // Use proxy for connection pooling (fast repeated renders)
      const sessionID = parentGUID.sessionID || Date.now() % 1000000
      
      const sendNodeChanges = async (changes: unknown[]) => {
        const response = await fetch(`${PROXY_URL}/render`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileKey, nodeChanges: changes }),
        })
        const data = await response.json() as { error?: string }
        if (data.error) {
          throw new Error(data.error)
        }
      }
      
      // Load Figma variables for name resolution (if not already loaded)
      if (!isRegistryLoaded()) {
        try {
          const variables = await sendCommand<Array<{ id: string; name: string }>>('get-variables')
          loadVariablesIntoRegistry(variables)
        } catch {
          // Variables not available - name-based lookup will fail, ID-based still works
        }
      }
      
      // Create React element and render to NodeChanges
      const props = args.props ? JSON.parse(args.props) : {}
      const element = React.createElement(Component, props)
      
      const result = renderToNodeChanges(element, {
        sessionID,
        parentGUID,
        startLocalID: Date.now() % 1000000,
      })
      
      if (args.dryRun) {
        console.log(JSON.stringify(result.nodeChanges, null, 2))
        return
      }
      
      if (!args.json) {
        console.log(`Rendering ${result.nodeChanges.length} nodes...`)
      }
      
      // Send to Figma via proxy
      await sendNodeChanges(result.nodeChanges)
      
      // Output
      if (args.json) {
        const ids = result.nodeChanges.map(nc => ({
          id: `${nc.guid.sessionID}:${nc.guid.localID}`,
          name: nc.name,
        }))
        console.log(JSON.stringify(ids, null, 2))
      } else {
        console.log(ok(`Rendered ${result.nodeChanges.length} nodes`))
        const first = result.nodeChanges[0]
        if (first) {
          console.log(`  root: ${first.guid.sessionID}:${first.guid.localID}`)
        }
      }
      
    } catch (e) { 
      handleError(e) 
    } finally {
      // Cleanup temp file
      if (tempFile && existsSync(tempFile)) {
        unlinkSync(tempFile)
      }
    }
  }
})

function parseGUID(id: string): { sessionID: number; localID: number } {
  const parts = id.split(':').map(Number)
  return { sessionID: parts[0] ?? 0, localID: parts[1] ?? 0 }
}
