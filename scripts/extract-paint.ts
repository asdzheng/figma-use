#!/usr/bin/env bun
/**
 * Extract fillPaints or strokePaints from NodeChange hex
 * Usage: bun scripts/extract-paint.ts <hex_file> [fill|stroke]
 */

const file = process.argv[2]
const paintType = process.argv[3] || 'fill'

if (!file) {
  console.log('Usage: bun scripts/extract-paint.ts <hex_file> [fill|stroke]')
  process.exit(1)
}

const hex = (await Bun.file(file).text()).trim()

// fillPaints = field 38 (0x26)
// strokePaints = field 39 (0x27)
const fieldMarker = paintType === 'stroke' ? '27' : '26'

// Find field marker
const idx = hex.indexOf(fieldMarker)
if (idx === -1) {
  console.log(`No ${paintType}Paints field (${fieldMarker}) found`)
  process.exit(1)
}

// Extract from field marker until next field or end
// Paint array format: 26 01 <paint> 00 00 (01 = array length, then paint, then 00 00 terminators)
const startIdx = idx + 2 // Skip field marker

// Find the end - look for pattern that indicates next field
// Usually: 00 00 followed by another field number
let endIdx = startIdx
let zeroCount = 0
for (let i = startIdx; i < hex.length; i += 2) {
  const byte = hex.slice(i, i + 2)
  if (byte === '00') {
    zeroCount++
    if (zeroCount >= 2) {
      // Check if next non-zero is a valid field number (< 0x40 or varint)
      let j = i + 4
      while (j < hex.length && hex.slice(j, j + 2) === '00') j += 2
      if (j < hex.length) {
        const nextByte = parseInt(hex.slice(j, j + 2), 16)
        if (nextByte > 0 && nextByte < 0x80) {
          endIdx = j
          break
        }
      }
    }
  } else {
    zeroCount = 0
  }
  endIdx = i + 2
}

const paintHex = hex.slice(startIdx, endIdx)

console.log(`=== ${paintType}Paints extracted ===`)
console.log(`Position: ${idx / 2} - ${endIdx / 2} (${(endIdx - idx) / 2} bytes)`)
console.log(`Hex: ${paintHex}`)

// Save to file
const outFile = file.replace('.hex', `_${paintType}Paint.hex`)
await Bun.write(outFile, paintHex)
console.log(`Saved to: ${outFile}`)
