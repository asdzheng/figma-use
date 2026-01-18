#!/usr/bin/env bun
/**
 * Diff two hex files byte-by-byte with context
 * Usage: bun scripts/diff-hex.ts <file1> <file2> [context_bytes]
 */

const file1 = process.argv[2]
const file2 = process.argv[3]
const contextBytes = parseInt(process.argv[4] || '8')

if (!file1 || !file2) {
  console.log('Usage: bun scripts/diff-hex.ts <file1.hex> <file2.hex> [context_bytes]')
  process.exit(1)
}

const hex1 = (await Bun.file(file1).text()).trim()
const hex2 = (await Bun.file(file2).text()).trim()

// Convert to byte arrays for easier analysis
const bytes1 = hex1.match(/.{2}/g) || []
const bytes2 = hex2.match(/.{2}/g) || []

const maxLen = Math.max(bytes1.length, bytes2.length)

interface Diff {
  offset: number
  byte1: string
  byte2: string
}

const diffs: Diff[] = []

for (let i = 0; i < maxLen; i++) {
  const b1 = bytes1[i] || '__'
  const b2 = bytes2[i] || '__'
  if (b1 !== b2) {
    diffs.push({ offset: i, byte1: b1, byte2: b2 })
  }
}

console.log(`File 1: ${file1} (${bytes1.length} bytes)`)
console.log(`File 2: ${file2} (${bytes2.length} bytes)`)
console.log(`Differences: ${diffs.length}`)
console.log('')

if (diffs.length === 0) {
  console.log('✅ Files are identical')
  process.exit(0)
}

// Group consecutive diffs
interface DiffGroup {
  start: number
  end: number
  bytes1: string[]
  bytes2: string[]
}

const groups: DiffGroup[] = []
let currentGroup: DiffGroup | null = null

for (const diff of diffs) {
  if (!currentGroup || diff.offset > currentGroup.end + 1) {
    if (currentGroup) groups.push(currentGroup)
    currentGroup = {
      start: diff.offset,
      end: diff.offset,
      bytes1: [diff.byte1],
      bytes2: [diff.byte2]
    }
  } else {
    currentGroup.end = diff.offset
    currentGroup.bytes1.push(diff.byte1)
    currentGroup.bytes2.push(diff.byte2)
  }
}
if (currentGroup) groups.push(currentGroup)

console.log(`Found ${groups.length} diff region(s):\n`)

for (const group of groups) {
  const ctxStart = Math.max(0, group.start - contextBytes)
  const ctxEnd = Math.min(maxLen, group.end + contextBytes + 1)
  
  console.log(`--- Offset ${group.start}-${group.end} (${group.end - group.start + 1} bytes) ---`)
  
  // Context before
  const before1 = bytes1.slice(ctxStart, group.start).join('')
  const before2 = bytes2.slice(ctxStart, group.start).join('')
  
  // Diff region
  const diff1 = bytes1.slice(group.start, group.end + 1).join('')
  const diff2 = bytes2.slice(group.start, group.end + 1).join('')
  
  // Context after  
  const after1 = bytes1.slice(group.end + 1, ctxEnd).join('')
  const after2 = bytes2.slice(group.end + 1, ctxEnd).join('')
  
  console.log(`File1: ${before1} [${diff1}] ${after1}`)
  console.log(`File2: ${before2} [${diff2}] ${after2}`)
  console.log('')
}

// Summary of all diffs
console.log('=== All changed bytes ===')
for (const diff of diffs) {
  const val1 = parseInt(diff.byte1, 16)
  const val2 = parseInt(diff.byte2, 16)
  const char1 = val1 >= 32 && val1 < 127 ? String.fromCharCode(val1) : '.'
  const char2 = val2 >= 32 && val2 < 127 ? String.fromCharCode(val2) : '.'
  console.log(`  @${diff.offset}: ${diff.byte1} -> ${diff.byte2}  (${val1} -> ${val2})  '${char1}' -> '${char2}'`)
}
