import { defineCommand } from 'citty'
import { spawn } from 'child_process'
import { resolve, dirname } from 'path'
import consola from 'consola'

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

function copyToClipboard(text: string): boolean {
  try {
    if (process.platform === 'darwin') {
      const proc = spawn('pbcopy')
      proc.stdin.end(text)
      return true
    } else if (process.platform === 'win32') {
      const proc = spawn('clip')
      proc.stdin.end(text)
      return true
    } else {
      const proc = spawn('xclip', ['-selection', 'clipboard'])
      proc.stdin.end(text)
      proc.on('error', () => {
        const xsel = spawn('xsel', ['--clipboard', '--input'])
        xsel.stdin.end(text)
      })
      return true
    }
  } catch {
    return false
  }
}

export default defineCommand({
  meta: { description: 'Show Figma plugin installation instructions' },
  async run() {
    const root = getPackageRoot()
    const pluginPath = resolve(root, 'packages', 'plugin', 'dist', 'manifest.json')
    
    consola.box({
      title: 'Figma Use Plugin',
      message: `To install the plugin in Figma:

1. Open Figma Desktop
2. Go to: Plugins → Development → Import plugin from manifest
3. Select this file:

   ${pluginPath}`
    })
    
    if (copyToClipboard(pluginPath)) {
      consola.success('Path copied to clipboard')
    }
  }
})
