#!/usr/bin/env bun
/**
 * Encode Paint with variable binding manually
 * Usage: bun scripts/encode-paint-with-var.ts <sessionID> <localID> [r g b a]
 */

import { compileSchema } from 'kiwi-schema'
import schema from '../packages/cli/src/multiplayer/schema.ts'

const compiled = compileSchema(schema)

const sessionID = parseInt(process.argv[2] || '38448')
const localID = parseInt(process.argv[3] || '122296')
const r = parseFloat(process.argv[4] || '0.9725490212440491')
const g = parseFloat(process.argv[5] || '0.9803921580314636')
const b = parseFloat(process.argv[6] || '0.9882352948188782')
const a = parseFloat(process.argv[7] || '1')

function encodeVarint(value: number): number[] {
  const bytes: number[] = []
  while (value > 0x7f) {
    bytes.push((value & 0x7f) | 0x80)
    value >>>= 7
  }
  bytes.push(value)
  return bytes
}

// Encode base paint WITHOUT variable binding
const basePaint = {
  type: 'SOLID',
  color: { r, g, b, a },
  opacity: 1,
  visible: true,
  blendMode: 'NORMAL'
}
const basePaintBytes = compiled.encodePaint(basePaint)
const baseHex = Buffer.from(basePaintBytes).toString('hex')

console.log('=== Base Paint (no variable) ===')
console.log('Hex:', baseHex)
console.log('Length:', basePaintBytes.length, 'bytes')
console.log()

// Find where to insert variable binding (before final 00)
// Base paint ends with: ...04 01 05 01 00
// We need to insert: 15 01 04 01 <sessionID> <localID> 00 00 02 03 03 04
// Before the final 00

// Actually looking at captured data:
// WITH_VAR: ...04 01 05 01 15 01 04 01 b0ac02 b8bb07 00 00 02 03 03 04 00 00
// NO_VAR:   ...04 01 05 01 00

// So we insert the binding AFTER 05 01, BEFORE 00

const baseArray = Array.from(basePaintBytes)

// Remove trailing 00
if (baseArray[baseArray.length - 1] === 0) {
  baseArray.pop()
}

// Add variable binding
// Field 21 (0x15) = 1
baseArray.push(0x15, 0x01)
// Field 4 = 1
baseArray.push(0x04, 0x01)
// Raw varints: sessionID, localID
baseArray.push(...encodeVarint(sessionID))
baseArray.push(...encodeVarint(localID))
// Terminators and extra fields observed in Figma
baseArray.push(0x00, 0x00, 0x02, 0x03, 0x03, 0x04)
// Final terminators
baseArray.push(0x00, 0x00)

const withVarHex = Buffer.from(baseArray).toString('hex')

console.log('=== Paint WITH variable binding ===')
console.log('Hex:', withVarHex)
console.log('Length:', baseArray.length, 'bytes')
console.log()

// Compare with captured Figma data
const figmaHex = '0100027ef2f1f17ef6f5f57efaf9f97f000000037f0000000401050115010401b0ac02b8bb070000020303040000'
console.log('=== Comparison with Figma captured ===')
console.log('Figma: ', figmaHex)
console.log('Ours:  ', withVarHex)
console.log('Match:', figmaHex === withVarHex ? '✅ YES' : '❌ NO')

if (figmaHex !== withVarHex) {
  // Find differences
  const f = figmaHex.match(/.{2}/g)!
  const o = withVarHex.match(/.{2}/g)!
  const maxLen = Math.max(f.length, o.length)
  
  console.log()
  console.log('Differences:')
  for (let i = 0; i < maxLen; i++) {
    if (f[i] !== o[i]) {
      console.log(`  @${i}: Figma=${f[i] || '__'} Ours=${o[i] || '__'}`)
    }
  }
}
