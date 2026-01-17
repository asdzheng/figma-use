import { defineCommand } from 'citty'
import { handleError } from '../client.ts'
import { ok, fail } from '../format.ts'
import { resolve } from 'path'
import { existsSync } from 'fs'

// Inline JSX runtime (compatible with all JSX transforms)
const JSX_RUNTIME = `
const jsx = (type, props) => {
  const { children, ...rest } = props || {}
  return {
    type,
    props: rest,
    children: children ? (Array.isArray(children) ? children.flat() : [children]) : []
  }
}
const jsxs = jsx
const jsxDEV = (type, props) => jsx(type, props)
const Fragment = ({ children }) => children
`

// Map JSX types to Figma commands
const TYPE_MAP: Record<string, string> = {
  frame: 'create-frame',
  rect: 'create-rectangle',
  ellipse: 'create-ellipse',
  text: 'create-text',
  line: 'create-line',
  component: 'create-component',
  instance: 'create-instance',
  section: 'create-section',
  vector: 'create-vector',
}

type VNode = {
  type: string | Function
  props: Record<string, unknown>
  children: (VNode | string | number)[]
}

type FigmaCommand = {
  command: string
  args: Record<string, unknown>
  children?: FigmaCommand[]
}

function mapProps(props: Record<string, unknown>, textContent?: string): Record<string, unknown> {
  const mapped: Record<string, unknown> = {}
  
  for (const [key, value] of Object.entries(props)) {
    switch (key) {
      case 'layout':
        const layoutVal = String(value).toUpperCase()
        if (layoutVal === 'COL' || layoutVal === 'COLUMN') {
          mapped.layoutMode = 'VERTICAL'
        } else if (layoutVal === 'ROW') {
          mapped.layoutMode = 'HORIZONTAL'
        } else {
          mapped.layoutMode = layoutVal
        }
        break
      case 'gap':
        mapped.itemSpacing = value
        break
      case 'padding':
        if (typeof value === 'number') {
          mapped.padding = { top: value, right: value, bottom: value, left: value }
        } else if (Array.isArray(value)) {
          if (value.length === 2) {
            mapped.padding = { top: value[0], right: value[1], bottom: value[0], left: value[1] }
          } else if (value.length === 4) {
            mapped.padding = { top: value[0], right: value[1], bottom: value[2], left: value[3] }
          }
        } else if (typeof value === 'string') {
          const parts = value.split(',').map(Number)
          if (parts.length === 1) {
            mapped.padding = { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] }
          } else if (parts.length === 4) {
            mapped.padding = { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] }
          }
        }
        break
      case 'w': mapped.width = value; break
      case 'h': mapped.height = value; break
      case 'bg': mapped.fill = value; break
      case 'r': case 'radius': mapped.radius = value; break
      case 'border': mapped.stroke = value; break
      case 'borderWidth': mapped.strokeWeight = value; break
      case 'bold': if (value) mapped.fontStyle = 'Bold'; break
      case 'italic': if (value) mapped.fontStyle = 'Italic'; break
      case 'key': break // React key, ignore
      default: mapped[key] = value
    }
  }
  
  if (textContent) mapped.text = textContent
  return mapped
}

function vnodeToCommands(vnode: VNode | string | number): FigmaCommand | string {
  if (typeof vnode === 'string' || typeof vnode === 'number') return String(vnode)
  
  const { type, props, children } = vnode
  
  if (typeof type === 'function') {
    const result = type({ ...props, children })
    if (Array.isArray(result)) {
      return { command: '__fragment__', args: {}, children: result.map(vnodeToCommands) as FigmaCommand[] }
    }
    return vnodeToCommands(result)
  }
  
  const textChildren = children.filter(c => typeof c === 'string' || typeof c === 'number')
  const nodeChildren = children.filter(c => typeof c !== 'string' && typeof c !== 'number') as VNode[]
  const textContent = textChildren.join('') || undefined
  
  const command = TYPE_MAP[type]
  if (!command) throw new Error(`Unknown element type: ${type}`)
  
  const mappedProps = mapProps(props, textContent)
  
  // Default size for frames without explicit dimensions
  if (command === 'create-frame') {
    if (!mappedProps.width) mappedProps.width = 100
    if (!mappedProps.height) mappedProps.height = 100
  }
  
  return {
    command,
    args: mappedProps,
    children: nodeChildren.map(vnodeToCommands) as FigmaCommand[]
  }
}

function flattenCommands(cmd: FigmaCommand | string): FigmaCommand[] {
  if (typeof cmd === 'string') return []
  if (cmd.command === '__fragment__') {
    return (cmd.children || []).flatMap(flattenCommands)
  }
  return [{ ...cmd, children: (cmd.children || []).flatMap(flattenCommands) }]
}

// Flatten tree to batch commands with parent references
function flattenToBatch(
  commands: FigmaCommand[], 
  parentRef?: string
): Array<{ command: string; args: Record<string, unknown> }> {
  const batch: Array<{ command: string; args: Record<string, unknown> }> = []
  
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i]
    const ref = `node_${batch.length}`
    const args: Record<string, unknown> = { 
      ...cmd.args, 
      x: cmd.args.x ?? 0, 
      y: cmd.args.y ?? 0,
      ref 
    }
    if (parentRef) args.parentRef = parentRef
    
    batch.push({ command: cmd.command, args })
    
    if (cmd.children?.length) {
      batch.push(...flattenToBatch(cmd.children, ref))
    }
  }
  
  return batch
}

async function executeBatch(
  commands: FigmaCommand[], 
  parentId?: string
): Promise<{ id: string; name: string }[]> {
  const batch = flattenToBatch(commands, parentId ? `__root__` : undefined)
  
  // If parentId provided, add it to first level commands
  if (parentId) {
    for (const cmd of batch) {
      if (cmd.args.parentRef === '__root__') {
        cmd.args.parentId = parentId
        delete cmd.args.parentRef
      }
    }
  }
  
  const response = await fetch('http://localhost:38451/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ commands: batch, timeout: 60000 })
  })
  
  const data = await response.json() as { result?: { id: string; name: string }[]; error?: string }
  if (data.error) throw new Error(data.error)
  
  return data.result || []
}

export default defineCommand({
  meta: { description: 'Render TSX/JSX component to Figma' },
  args: {
    file: { type: 'positional', description: 'TSX/JSX file path', required: true },
    props: { type: 'string', description: 'JSON props to pass to component' },
    parent: { type: 'string', description: 'Parent node ID' },
    export: { type: 'string', description: 'Named export (default: default)' },
    json: { type: 'boolean', description: 'Output as JSON' }
  },
  async run({ args }) {
    const filePath = resolve(args.file)
    
    if (!existsSync(filePath)) {
      console.error(fail(`File not found: ${filePath}`))
      process.exit(1)
    }
    
    try {
      // Transpile TSX
      const transpiler = new Bun.Transpiler({ loader: 'tsx' })
      const source = await Bun.file(filePath).text()
      let code = transpiler.transformSync(source)
      
      // Replace JSX imports and mangled function names
      code = code.replace(/import\s*{[^}]*}\s*from\s*["']react["'];?/g, '')
      code = code.replace(/import\s+React[^;]*;?/g, '')
      code = code.replace(/jsxDEV_[a-z0-9]+/g, 'jsxDEV')
      code = code.replace(/jsx_[a-z0-9]+/g, 'jsx')
      code = code.replace(/jsxs_[a-z0-9]+/g, 'jsxs')
      code = code.replace(/Fragment_[a-z0-9]+/g, 'Fragment')
      
      const moduleCode = `${JSX_RUNTIME}\n${code}`
      
      // Execute
      const tempFile = `/tmp/figma-render-${Date.now()}.mjs`
      await Bun.write(tempFile, moduleCode)
      const module = await import(tempFile)
      await Bun.file(tempFile).unlink().catch(() => {})
      
      const exportName = args.export || 'default'
      const Component = module[exportName]
      
      if (!Component) {
        console.error(fail(`Export "${exportName}" not found`))
        process.exit(1)
      }
      
      const props = args.props ? JSON.parse(args.props) : {}
      const element = typeof Component === 'function' ? Component(props) : Component
      
      const commandTree = vnodeToCommands(element)
      const commands = flattenCommands(commandTree as FigmaCommand)
      
      const countNodes = (cmds: FigmaCommand[]): number => 
        cmds.reduce((sum, c) => sum + 1 + countNodes(c.children || []), 0)
      const total = countNodes(commands)
      
      if (!args.json) console.log(`Rendering ${total} nodes (batched)...`)
      const results = await executeBatch(commands, args.parent)
      
      if (args.json) {
        console.log(JSON.stringify(results, null, 2))
      } else {
        console.log(ok(`Rendered ${results.length} nodes`))
        if (results.length > 0) console.log(`  root: ${results[0].id}`)
      }
      
    } catch (e) { handleError(e) }
  }
})
