#!/usr/bin/env bun
/**
 * Capture Figma WebSocket traffic and save to files for analysis
 * Usage: bun scripts/capture.ts <name> [timeout_sec]
 */

import { decompress } from '../packages/cli/src/multiplayer/codec.ts'

const name = process.argv[2] || 'capture_' + Date.now()
const timeout = parseInt(process.argv[3] || '30') * 1000

const outDir = `/tmp/figma-captures/${name}`
await Bun.write(`${outDir}/.keep`, '')

// Find Figma page
const res = await fetch('http://localhost:9222/json')
const targets = await res.json() as { url: string; webSocketDebuggerUrl: string; id: string }[]
const figma = targets.find(t => t.url.includes('figma.com/design'))

if (!figma) {
  console.error('❌ No Figma file open in debug mode')
  process.exit(1)
}

console.log(`📁 Output: ${outDir}`)
console.log(`⏱️  Timeout: ${timeout / 1000}s`)
console.log('')

// Connect to page's CDP directly
const ws = new WebSocket(figma.webSocketDebuggerUrl)

let msgCount = 0
const summary: string[] = []
let cdpId = 1

ws.onopen = () => {
  // Enable Network domain
  ws.send(JSON.stringify({ id: cdpId++, method: 'Network.enable' }))
  console.log('🔍 Listening... Do something in Figma\n')
}

ws.onmessage = async (event) => {
  const msg = JSON.parse(event.data as string)
  
  if (msg.method === 'Network.webSocketFrameSent' || msg.method === 'Network.webSocketFrameReceived') {
    const payload = msg.params?.response?.payloadData
    if (!payload) return
    
    const data = Buffer.from(payload, 'base64')
    if (data.length < 10) return
    
    const direction = msg.method.includes('Sent') ? 'send' : 'recv'
    msgCount++
    const filename = `msg_${String(msgCount).padStart(3, '0')}_${direction}`
    
    try {
      const decompressed = decompress(new Uint8Array(data))
      const msgType = decompressed[1]
      
      await Bun.write(`${outDir}/${filename}.hex`, Buffer.from(decompressed).toString('hex'))
      await Bun.write(`${outDir}/${filename}.bin`, decompressed)
      
      summary.push(`${filename}: ${decompressed.length} bytes, type=${msgType}`)
      console.log(`${direction === 'send' ? '→' : '←'} ${direction.toUpperCase()} #${msgCount}: ${decompressed.length} bytes, type=${msgType}`)
    } catch (e) {
      // Not a kiwi message, skip
    }
  }
}

ws.onerror = (e) => {
  console.error('WebSocket error:', e)
}

// Wait for timeout
await new Promise(resolve => setTimeout(resolve, timeout))

await Bun.write(`${outDir}/summary.txt`, summary.join('\n'))
console.log(`\n✅ Captured ${msgCount} messages to ${outDir}`)

ws.close()
process.exit(0)
