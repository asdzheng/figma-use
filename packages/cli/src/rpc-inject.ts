// This file is bundled and injected into Figma via CDP
// It wraps the plugin's handleCommand function

import { handleCommand, loadAllPagesIfNeeded } from '../../plugin/src/handler.ts'

declare global {
  interface Window {
    __figmaRpc: (command: string, args?: unknown) => Promise<unknown>
    __figmaRpcReady: boolean
  }
}

window.__figmaRpc = async (command: string, args?: unknown) => {
  await loadAllPagesIfNeeded(command)
  return handleCommand(command, args)
}

window.__figmaRpcReady = true
