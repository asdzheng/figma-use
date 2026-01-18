#!/usr/bin/env bun
/**
 * Decode Paint using kiwi-schema
 * Usage: bun scripts/decode-paint.ts <hex_string_or_file>
 */

import { compileSchema } from 'kiwi-schema'
import schema from '../packages/cli/src/multiplayer/schema.ts'

const compiled = compileSchema(schema)

const input = process.argv[2]
if (!input) {
  console.log('Usage: bun scripts/decode-paint.ts <hex_or_file>')
  process.exit(1)
}

let hex: string
if (input.endsWith('.hex')) {
  hex = (await Bun.file(input).text()).trim()
} else {
  hex = input
}

// Remove fillPaints field header if present (26 01)
if (hex.startsWith('2601')) {
  hex = hex.slice(4) // Skip field 38 + array length
}

const bytes = new Uint8Array(hex.match(/.{2}/g)!.map(b => parseInt(b, 16)))

console.log('Input hex:', hex)
console.log('Bytes:', bytes.length)
console.log()

try {
  const paint = compiled.decodePaint(bytes)
  console.log('=== Decoded Paint ===')
  console.log(JSON.stringify(paint, null, 2))
} catch (e: any) {
  console.log('Decode error:', e.message)
  
  // Try to decode what we can
  console.log()
  console.log('=== Partial decode attempt ===')
  
  // Manual field inspection
  let pos = 0
  while (pos < bytes.length && bytes[pos] !== 0) {
    const field = bytes[pos++]
    console.log(`Field ${field}:`, bytes.slice(pos, pos + 10))
    
    // Skip based on field type guesses
    if (field === 1) { // type enum
      const val = bytes[pos++]
      console.log(`  -> type = ${val}`)
    } else if (field === 2) { // color struct
      console.log(`  -> color bytes:`, Array.from(bytes.slice(pos, pos + 20)).map(b => b.toString(16).padStart(2, '0')).join(' '))
      // Color is 4 floats, each potentially with marker
      pos += 16 // approximate
    }
  }
}

// Also encode a known paint to compare
console.log()
console.log('=== Reference: encode a SOLID red paint ===')
const redPaint = {
  type: 'SOLID',
  color: { r: 1, g: 0, b: 0, a: 1 },
  opacity: 1,
  visible: true,
  blendMode: 'NORMAL'
}
const encoded = compiled.encodePaint(redPaint)
console.log('Encoded red:', Buffer.from(encoded).toString('hex'))

const grayPaint = {
  type: 'SOLID', 
  color: { r: 0.9725490212440491, g: 0.9803921580314636, b: 0.9882352948188782, a: 1 },
  opacity: 1,
  visible: true,
  blendMode: 'NORMAL'
}
const encodedGray = compiled.encodePaint(grayPaint)
console.log('Encoded gray:', Buffer.from(encodedGray).toString('hex'))
