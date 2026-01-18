#!/usr/bin/env bun
/**
 * Parse Paint structure from hex
 * Usage: bun scripts/parse-paint.ts <hex_string_or_file>
 */

const input = process.argv[2]
if (!input) {
  console.log('Usage: bun scripts/parse-paint.ts <hex_or_file>')
  process.exit(1)
}

let hex: string
if (input.endsWith('.hex')) {
  hex = (await Bun.file(input).text()).trim()
} else {
  hex = input
}

const bytes = hex.match(/.{2}/g)!.map(b => parseInt(b, 16))

function readVarint(bytes: number[], offset: number): [number, number] {
  let result = 0
  let shift = 0
  let pos = offset
  while (pos < bytes.length) {
    const b = bytes[pos++]
    result |= (b & 0x7f) << shift
    if ((b & 0x80) === 0) break
    shift += 7
  }
  return [result, pos]
}

function parseFloat32(bytes: number[], offset: number): number {
  const buf = new ArrayBuffer(4)
  const view = new DataView(buf)
  for (let i = 0; i < 4; i++) {
    view.setUint8(i, bytes[offset + i])
  }
  return view.getFloat32(0, true)
}

console.log('=== Paint Structure Analysis ===')
console.log(`Total: ${bytes.length} bytes`)
console.log(`Hex: ${hex}`)
console.log('')

let pos = 0
while (pos < bytes.length) {
  const fieldByte = bytes[pos]
  if (fieldByte === 0) {
    console.log(`@${pos}: 00 = END`)
    pos++
    continue
  }
  
  const [fieldNum, nextPos] = readVarint(bytes, pos)
  const fieldHex = bytes.slice(pos, nextPos).map(b => b.toString(16).padStart(2, '0')).join('')
  pos = nextPos
  
  console.log(`@${pos - (nextPos - pos)}: Field ${fieldNum} (0x${fieldNum.toString(16)}) [${fieldHex}]`)
  
  // Known Paint fields:
  // 1 = type (enum)
  // 2 = color (Color message)
  // 3 = opacity (float)
  // 4 = visible (bool)
  // 5 = blendMode (enum)
  // 21 = variableBinding (custom struct)
  
  switch (fieldNum) {
    case 1: {
      const [type, np] = readVarint(bytes, pos)
      const types = ['SOLID', 'GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR', 'GRADIENT_DIAMOND', 'IMAGE', 'EMOJI']
      console.log(`       -> type = ${type} (${types[type] || '?'})`)
      pos = np
      break
    }
    case 2: {
      console.log(`       -> color (Color struct):`)
      // Color has: r=1 (float), g=2 (float), b=3 (float), a=4 (float) - but often encoded differently
      // Let's read until we hit 00 or next field
      let colorEnd = pos
      while (colorEnd < bytes.length && bytes[colorEnd] !== 0) colorEnd++
      const colorHex = bytes.slice(pos, colorEnd).map(b => b.toString(16).padStart(2, '0')).join('')
      console.log(`          raw: ${colorHex}`)
      pos = colorEnd
      break
    }
    case 3: {
      // Float - 4 bytes LE, but may have 7f prefix
      if (bytes[pos] === 0x7f) {
        const val = parseFloat32(bytes, pos + 1)
        console.log(`       -> opacity = ${val} (with 7f prefix)`)
        pos += 5
      } else {
        const val = parseFloat32(bytes, pos)
        console.log(`       -> opacity = ${val}`)
        pos += 4
      }
      break
    }
    case 4: {
      const [val, np] = readVarint(bytes, pos)
      console.log(`       -> visible = ${val === 1}`)
      pos = np
      break
    }
    case 5: {
      const [mode, np] = readVarint(bytes, pos)
      const modes = ['PASS_THROUGH', 'NORMAL', 'DARKEN', 'MULTIPLY', 'LINEAR_BURN', 'COLOR_BURN', 'LIGHTEN', 'SCREEN', 'LINEAR_DODGE', 'COLOR_DODGE', 'OVERLAY', 'SOFT_LIGHT', 'HARD_LIGHT', 'DIFFERENCE', 'EXCLUSION', 'HUE', 'SATURATION', 'COLOR', 'LUMINOSITY']
      console.log(`       -> blendMode = ${mode} (${modes[mode] || '?'})`)
      pos = np
      break
    }
    case 21: {
      console.log(`       -> VARIABLE BINDING:`)
      // 21 = field 21, then nested structure
      const [bindType, p1] = readVarint(bytes, pos)
      console.log(`          bindingType = ${bindType}`)
      pos = p1
      
      // Read nested fields until 00
      while (pos < bytes.length && bytes[pos] !== 0) {
        const [nf, p2] = readVarint(bytes, pos)
        pos = p2
        console.log(`          nested field ${nf}:`)
        
        if (nf === 4) {
          // GUID follows: sessionID varint, localID varint
          const [sessId, p3] = readVarint(bytes, pos)
          pos = p3
          const [localId, p4] = readVarint(bytes, pos)
          pos = p4
          console.log(`            GUID = ${sessId}:${localId}`)
        } else {
          const [val, p3] = readVarint(bytes, pos)
          console.log(`            value = ${val}`)
          pos = p3
        }
      }
      if (bytes[pos] === 0) pos++
      break
    }
    default: {
      // Unknown field - try to read as varint
      const [val, np] = readVarint(bytes, pos)
      console.log(`       -> value = ${val}`)
      pos = np
    }
  }
}
