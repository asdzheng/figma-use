#!/usr/bin/env bun
/**
 * Parse kiwi-encoded bytes with detailed output
 * Usage: bun scripts/parse-kiwi.ts <hex_string_or_file> [--offset N]
 */

const input = process.argv[2]
const offsetArg = process.argv.indexOf('--offset')
const startOffset = offsetArg !== -1 ? parseInt(process.argv[offsetArg + 1]) : 0

if (!input) {
  console.log('Usage: bun scripts/parse-kiwi.ts <hex_or_file> [--offset N]')
  process.exit(1)
}

let hex: string
if (input.endsWith('.hex') || input.endsWith('.bin')) {
  const file = Bun.file(input)
  if (input.endsWith('.bin')) {
    const buf = await file.arrayBuffer()
    hex = Buffer.from(buf).toString('hex')
  } else {
    hex = (await file.text()).trim()
  }
} else {
  hex = input
}

const bytes = hex.match(/.{2}/g)!.map(b => parseInt(b, 16))

function readVarint(pos: number): [number, number] {
  let result = 0
  let shift = 0
  while (pos < bytes.length) {
    const b = bytes[pos++]
    result |= (b & 0x7f) << shift
    if ((b & 0x80) === 0) break
    shift += 7
  }
  return [result, pos]
}

function readFloat32(pos: number): [number, number] {
  const buf = Buffer.from(bytes.slice(pos, pos + 4))
  return [buf.readFloatLE(0), pos + 4]
}

function toHex(arr: number[]): string {
  return arr.map(b => b.toString(16).padStart(2, '0')).join('')
}

console.log(`Total: ${bytes.length} bytes`)
console.log(`Hex: ${hex.slice(0, 100)}${hex.length > 100 ? '...' : ''}`)
console.log()

let pos = startOffset
let indent = ''

function log(msg: string) {
  console.log(`${indent}@${pos.toString().padStart(3)}: ${msg}`)
}

while (pos < bytes.length) {
  const fieldByte = bytes[pos]
  
  if (fieldByte === 0) {
    log('00 = END')
    pos++
    continue
  }
  
  const startPos = pos
  const [fieldNum, nextPos] = readVarint(pos)
  const fieldHex = toHex(bytes.slice(pos, nextPos))
  pos = nextPos
  
  log(`Field ${fieldNum} (0x${fieldNum.toString(16)}) [${fieldHex}]`)
  
  // Read next byte to understand value type
  if (pos < bytes.length) {
    const valueByte = bytes[pos]
    const valueHex = toHex(bytes.slice(pos, Math.min(pos + 16, bytes.length)))
    console.log(`${indent}     Value preview: ${valueHex}`)
  }
}
