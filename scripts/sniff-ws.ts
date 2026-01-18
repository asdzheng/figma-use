/**
 * Sniff Figma WebSocket traffic via Chrome DevTools Protocol
 * 
 * Usage: bun scripts/sniff-ws.ts
 */

import { initCodec, decodeMessage, decompress } from '../packages/cli/src/multiplayer/codec.ts'
import { isZstdCompressed, hasFigWireHeader, skipFigWireHeader, isKiwiMessage, getKiwiMessageType, MESSAGE_TYPES } from '../packages/cli/src/multiplayer/protocol.ts'

const DEVTOOLS_URL = 'http://localhost:9222/json'

interface Target {
  webSocketDebuggerUrl: string
  title: string
  url: string
}

async function main() {
  await initCodec()
  
  // Get DevTools target
  const targets = await fetch(DEVTOOLS_URL).then(r => r.json()) as Target[]
  const figmaTarget = targets.find(t => t.url.includes('/design/') || t.url.includes('/file/'))
  
  if (!figmaTarget) {
    console.error('No Figma tab found')
    process.exit(1)
  }
  
  console.log(`Connecting to: ${figmaTarget.title}\n`)
  
  const ws = new WebSocket(figmaTarget.webSocketDebuggerUrl)
  
  let msgId = 1
  const send = (method: string, params?: object) => {
    ws.send(JSON.stringify({ id: msgId++, method, params }))
  }
  
  ws.onopen = () => {
    send('Network.enable')
    console.log('🔍 Listening... Create/modify a node with variable in Figma\n')
  }
  
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data as string)
    
    if (msg.method === 'Network.webSocketFrameSent') {
      const payload = msg.params?.response?.payloadData
      if (!payload) return
      
      // Skip JSON messages
      if (payload.startsWith('{') || payload.startsWith('[')) return
      
      let bytes = new Uint8Array(Buffer.from(payload, 'base64'))
      console.log(`→ SEND [${bytes.length} bytes]`)
      
      // Decompress if zstd
      if (isZstdCompressed(bytes)) {
        try {
          bytes = decompress(bytes)
          console.log(`  Decompressed: ${bytes.length} bytes`)
        } catch (e) {
          console.log(`  Decompress failed: ${e}`)
          return
        }
      }
      
      // Skip FigWire header if present
      if (hasFigWireHeader(bytes)) {
        bytes = skipFigWireHeader(bytes)
        console.log(`  After FigWire skip: ${bytes.length} bytes`)
      }
      
      // Check if it's a Kiwi message
      if (!isKiwiMessage(bytes)) {
        const hex = Buffer.from(bytes).toString('hex').slice(0, 100)
        console.log(`  Not Kiwi: ${hex}...`)
        return
      }
      
      const msgType = getKiwiMessageType(bytes)
      console.log(`  Kiwi message type: ${msgType} (${msgType === 1 ? 'NODE_CHANGES' : msgType === 2 ? 'USER_CHANGES' : 'OTHER'})`)
      
      // Dump FULL hex
      const hexFull = Buffer.from(bytes).toString('hex')
      console.log(`  Full hex (${bytes.length} bytes):`)
      console.log(`  ${hexFull}`)
      
      // Try to find strings in the message (like variable names)
      const str = Buffer.from(bytes).toString('utf8')
      const matches = str.match(/[A-Za-z_][A-Za-z0-9_\/]{5,}/g)
      if (matches) {
        const unique = [...new Set(matches)].filter(m => 
          m.includes('Variable') || m.includes('Color') || m.includes('SNIFF')
        )
        if (unique.length) {
          console.log(`  Strings found: ${unique.join(', ')}`)
        }
      }
      
      // Try to decode as Figma message
      try {
        const decoded = decodeMessage(bytes)
        console.log(`  ✅ Decoded type: ${decoded.type}`)
        
        if (decoded.nodeChanges?.length) {
          for (const nc of decoded.nodeChanges) {
            console.log(`\n  📦 NodeChange: ${nc.name || '(unnamed)'} [${nc.type}]`)
            console.log(`     GUID: ${nc.guid?.sessionID}:${nc.guid?.localID}`)
            
            // Print all non-null fields
            for (const [key, value] of Object.entries(nc)) {
              if (value != null && key !== 'guid' && key !== 'name' && key !== 'type') {
                const str = JSON.stringify(value)
                if (str.length > 200) {
                  console.log(`     ${key}: ${str.slice(0, 200)}...`)
                } else {
                  console.log(`     ${key}: ${str}`)
                }
              }
            }
          }
        }
      } catch (e) {
        console.log(`  ❌ Decode error: ${e}`)
      }
    }
  }
  
  ws.onerror = (e) => console.error('Error:', e)
  
  process.on('SIGINT', () => {
    ws.close()
    process.exit(0)
  })
}

main()
