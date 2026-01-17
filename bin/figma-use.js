#!/usr/bin/env bun
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)

// If first arg is 'proxy' or 'plugin', handle specially
if (args[0] === 'proxy') {
  const proxyPath = join(__dirname, '..', 'dist', 'proxy', 'index.js')
  spawn('bun', ['run', proxyPath], { stdio: 'inherit' })
} else if (args[0] === 'plugin') {
  const pluginPath = join(__dirname, '..', 'packages', 'plugin', 'dist')
  console.log(`Plugin files at: ${pluginPath}`)
  console.log('Import manifest.json into Figma via Plugins > Development > Import plugin from manifest')
} else {
  // CLI command
  const cliPath = join(__dirname, '..', 'dist', 'cli', 'index.js')
  spawn('bun', ['run', cliPath, ...args], { stdio: 'inherit' })
}
