import { cdpEval } from './cdp.ts'
import { RPC_BUNDLE } from './rpc-bundle.ts'

export { printResult, printError, formatResult } from './output.ts'
export { getFileKey } from './cdp.ts'

let rpcInjected = false

async function ensureRpcInjected(): Promise<void> {
  if (rpcInjected) return

  const isReady = await cdpEval<boolean>('typeof window.__figmaRpc === "function"')
  if (isReady) {
    rpcInjected = true
    return
  }

  await cdpEval(RPC_BUNDLE)
  
  // Verify injection
  const ready = await cdpEval<boolean>('typeof window.__figmaRpc === "function"')
  if (!ready) {
    throw new Error('Failed to inject RPC into Figma')
  }
  
  rpcInjected = true
}

export async function sendCommand<T = unknown>(
  command: string,
  args?: unknown,
  options?: { timeout?: number }
): Promise<T> {
  await ensureRpcInjected()
  
  const code = `window.__figmaRpc(${JSON.stringify(command)}, ${JSON.stringify(args)})`
  
  const result = await cdpEval<T | { __error: string }>(code, options?.timeout || 30000)
  
  if (result && typeof result === 'object' && '__error' in result) {
    throw new Error((result as { __error: string }).__error)
  }
  
  return result as T
}

export async function getStatus(): Promise<{ 
  connected: boolean
  fileName?: string
}> {
  try {
    await ensureRpcInjected()
    const fileName = await cdpEval<string>('figma.root.name')
    return { connected: true, fileName }
  } catch {
    return { connected: false }
  }
}

export function handleError(error: unknown): never {
  const { printError } = require('./output.ts')
  printError(error)
  process.exit(1)
}

export async function getParentGUID(): Promise<{ sessionID: number; localID: number }> {
  await ensureRpcInjected()
  const id = await cdpEval<string>('figma.currentPage.id')
  const parts = id.split(':').map(Number)
  return { sessionID: parts[0] ?? 0, localID: parts[1] ?? 0 }
}
