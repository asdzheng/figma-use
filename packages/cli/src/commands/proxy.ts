import { defineCommand } from 'citty'
import { spawn } from 'child_process'
import { resolve, dirname } from 'path'

function getPackageRoot(): string {
  const currentFile = import.meta.path || import.meta.url.replace('file://', '')
  let dir = dirname(currentFile)

  for (let i = 0; i < 10; i++) {
    try {
      const pkg = require(resolve(dir, 'package.json'))
      if (pkg.name === '@dannote/figma-use') {
        return dir
      }
    } catch {}
    dir = dirname(dir)
  }

  return dirname(dirname(dirname(currentFile)))
}

export default defineCommand({
  meta: { description: 'Start the WebSocket proxy server' },
  args: {
    port: { type: 'string', description: 'Port to listen on', default: '38451' }
  },
  run({ args }) {
    process.env.PORT = args.port
    const root = getPackageRoot()
    const proxyPath = resolve(root, 'dist', 'proxy', 'index.js')
    const child = spawn('bun', ['run', proxyPath], { stdio: 'inherit' })
    child.on('exit', (code) => process.exit(code || 0))
  }
})
