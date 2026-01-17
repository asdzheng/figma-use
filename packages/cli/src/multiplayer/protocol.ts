/**
 * Figma Multiplayer Protocol
 * 
 * This module handles the low-level WebSocket communication with Figma's
 * multiplayer server. The protocol uses:
 * 
 * - Kiwi binary serialization (schema-based, like Protocol Buffers)
 * - Zstd compression for all messages
 * - Session-based authentication via cookies
 * 
 * Message types (from Figma's schema):
 *   0 = JOIN_START     - Server sends session info
 *   1 = NODE_CHANGES   - Create/update/delete nodes
 *   2 = USER_CHANGES   - User presence updates
 *   3 = JOIN_END       - Initial sync complete
 *   4 = SIGNAL         - Various metadata (reconnect info, etc.)
 *   5 = STYLE          - Style updates
 *   ...and more
 * 
 * Wire format:
 *   All messages are Zstd-compressed Kiwi-encoded binary data.
 *   Zstd magic bytes: 0x28 0xB5 0x2F 0xFD
 */

export const MESSAGE_TYPES = {
  JOIN_START: 0,
  NODE_CHANGES: 1,
  USER_CHANGES: 2,
  JOIN_END: 3,
  SIGNAL: 4,
  STYLE: 5,
  STYLE_SET: 6,
  JOIN_START_SKIP_RELOAD: 7,
  NOTIFY_SHOULD_UPGRADE: 8,
  UPGRADE_DONE: 9,
  UPGRADE_REFRESH: 10,
  SCENE_GRAPH_QUERY: 11,
  SCENE_GRAPH_REPLY: 12,
  DIFF: 13,
  CLIENT_BROADCAST: 14,
} as const

export const NODE_TYPES = {
  NONE: 0,
  DOCUMENT: 1,
  CANVAS: 2,
  GROUP: 3,
  FRAME: 4,
  BOOLEAN_OPERATION: 5,
  VECTOR: 6,
  STAR: 7,
  LINE: 8,
  ELLIPSE: 9,
  RECTANGLE: 10,
  REGULAR_POLYGON: 11,
  ROUNDED_RECTANGLE: 12,
  TEXT: 13,
  SLICE: 14,
  SYMBOL: 15,
  INSTANCE: 16,
  STICKY: 17,
  SHAPE_WITH_TEXT: 18,
  CONNECTOR: 19,
  CODE_BLOCK: 20,
  WIDGET: 21,
  STAMP: 22,
  MEDIA: 23,
  HIGHLIGHT: 24,
  SECTION: 25,
  SECTION_OVERLAY: 26,
  WASHI_TAPE: 27,
  VARIABLE: 28,
} as const

export const NODE_PHASES = {
  CREATED: 0,
  REMOVED: 1,
} as const

export const BLEND_MODES = {
  PASS_THROUGH: 0,
  NORMAL: 1,
  DARKEN: 2,
  MULTIPLY: 3,
  LINEAR_BURN: 4,
  COLOR_BURN: 5,
  LIGHTEN: 6,
  SCREEN: 7,
  LINEAR_DODGE: 8,
  COLOR_DODGE: 9,
  OVERLAY: 10,
  SOFT_LIGHT: 11,
  HARD_LIGHT: 12,
  DIFFERENCE: 13,
  EXCLUSION: 14,
  HUE: 15,
  SATURATION: 16,
  COLOR: 17,
  LUMINOSITY: 18,
} as const

export const PAINT_TYPES = {
  SOLID: 0,
  GRADIENT_LINEAR: 1,
  GRADIENT_RADIAL: 2,
  GRADIENT_ANGULAR: 3,
  GRADIENT_DIAMOND: 4,
  IMAGE: 5,
  EMOJI: 6,
  VIDEO: 7,
} as const

/**
 * Zstd magic bytes
 */
export const ZSTD_MAGIC = new Uint8Array([0x28, 0xB5, 0x2F, 0xFD])

/**
 * fig-wire header magic (first 8 bytes of some messages)
 */
export const FIG_WIRE_MAGIC = 'fig-wire'

/**
 * Check if data is Zstd-compressed
 */
export function isZstdCompressed(data: Uint8Array): boolean {
  return data.length >= 4 &&
    data[0] === 0x28 &&
    data[1] === 0xB5 &&
    data[2] === 0x2F &&
    data[3] === 0xFD
}

/**
 * Check if data has fig-wire header
 */
export function hasFigWireHeader(data: Uint8Array): boolean {
  if (data.length < 8) return false
  const header = new TextDecoder().decode(data.slice(0, 8))
  return header === FIG_WIRE_MAGIC
}

/**
 * Skip fig-wire header and find zstd data
 * Header format: "fig-wire" (8 bytes) + version (4 bytes LE) + zstd data
 */
export function skipFigWireHeader(data: Uint8Array): Uint8Array {
  if (!hasFigWireHeader(data)) return data
  // Skip 8 bytes header + 4 bytes version
  return data.slice(12)
}

/**
 * Current multiplayer protocol version
 */
export const PROTOCOL_VERSION = 151

/**
 * Build WebSocket URL for Figma multiplayer
 */
export function buildMultiplayerUrl(fileKey: string, trackingId?: string): string {
  const params = new URLSearchParams({
    role: 'editor',
    version: String(PROTOCOL_VERSION),
    recentReload: '0',
    tracking_session_id: trackingId || `ws-${Date.now()}`,
  })
  return `wss://www.figma.com/api/multiplayer/${fileKey}?${params}`
}
