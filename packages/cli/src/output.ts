type NodeType = 'FRAME' | 'RECTANGLE' | 'ELLIPSE' | 'TEXT' | 'COMPONENT' | 'INSTANCE' | 'GROUP' | 'VECTOR' | 'LINE' | 'POLYGON' | 'STAR' | 'BOOLEAN_OPERATION'

const TYPE_LABELS: Record<string, string> = {
  FRAME: 'frame',
  RECTANGLE: 'rect',
  ELLIPSE: 'ellipse',
  TEXT: 'text',
  COMPONENT: 'component',
  INSTANCE: 'instance',
  GROUP: 'group',
  VECTOR: 'vector',
  LINE: 'line',
  POLYGON: 'polygon',
  STAR: 'star',
  BOOLEAN_OPERATION: 'boolean'
}

function formatColor(color: string): string {
  return color.startsWith('#') ? color : color
}

function formatFills(fills: Array<{ type: string; color?: string }>): string | null {
  if (!fills || fills.length === 0) return null
  const solid = fills.find(f => f.type === 'SOLID')
  return solid?.color ? formatColor(solid.color) : null
}

function formatStrokes(strokes: Array<{ type: string; color?: string }>, weight?: number): string | null {
  if (!strokes || strokes.length === 0) return null
  const solid = strokes.find(f => f.type === 'SOLID')
  if (!solid?.color) return null
  return weight ? `${formatColor(solid.color)} ${weight}px` : formatColor(solid.color)
}

function formatBox(node: { width?: number; height?: number; x?: number; y?: number }): string | null {
  if (node.width === undefined || node.height === undefined) return null
  const size = `${Math.round(node.width)}x${Math.round(node.height)}`
  if (node.x !== undefined && node.y !== undefined) {
    return `${size} at (${Math.round(node.x)}, ${Math.round(node.y)})`
  }
  return size
}

function formatNode(node: Record<string, unknown>, indent = ''): string {
  const lines: string[] = []
  const type = TYPE_LABELS[node.type as string] || (node.type as string)?.toLowerCase() || 'node'
  const name = node.name || node.characters || ''
  const id = node.id

  lines.push(`${indent}[${type}] "${name}" (${id})`)

  const details: string[] = []

  // Box
  const box = formatBox(node as { width?: number; height?: number; x?: number; y?: number })
  if (box) details.push(`box: ${box}`)

  // Fill
  const fill = formatFills(node.fills as Array<{ type: string; color?: string }>)
  if (fill) details.push(`fill: ${fill}`)

  // Stroke
  const stroke = formatStrokes(
    node.strokes as Array<{ type: string; color?: string }>,
    node.strokeWeight as number
  )
  if (stroke) details.push(`stroke: ${stroke}`)

  // Radius
  if (node.cornerRadius && node.cornerRadius !== 0) {
    details.push(`radius: ${node.cornerRadius}px`)
  }

  // Font (for text)
  if (node.fontSize) {
    const weight = node.fontWeight || ''
    details.push(`font: ${node.fontSize}px ${weight}`.trim())
  }

  // Characters (for text)
  if (node.characters && !name) {
    details.push(`text: "${node.characters}"`)
  }

  // Children count
  if (node.childCount !== undefined && node.childCount > 0) {
    details.push(`children: ${node.childCount}`)
  }

  // Layout
  if (node.layoutMode) {
    details.push(`layout: ${node.layoutMode}`)
  }

  // Opacity
  if (node.opacity !== undefined && node.opacity !== 1) {
    details.push(`opacity: ${node.opacity}`)
  }

  for (const detail of details) {
    lines.push(`${indent}  ${detail}`)
  }

  return lines.join('\n')
}

function formatNodeList(nodes: Array<Record<string, unknown>>): string {
  return nodes.map((node, i) => {
    const type = TYPE_LABELS[node.type as string] || (node.type as string)?.toLowerCase() || 'node'
    const name = node.name || node.characters || ''
    const id = node.id
    const box = formatBox(node as { width?: number; height?: number; x?: number; y?: number })
    
    const details: string[] = []
    if (box) details.push(`box: ${box}`)
    
    const fill = formatFills(node.fills as Array<{ type: string; color?: string }>)
    if (fill) details.push(`fill: ${fill}`)
    
    const stroke = formatStrokes(
      node.strokes as Array<{ type: string; color?: string }>,
      node.strokeWeight as number
    )
    if (stroke) details.push(`stroke: ${stroke}`)

    if (node.cornerRadius && node.cornerRadius !== 0) {
      details.push(`radius: ${node.cornerRadius}px`)
    }

    let line = `[${i}] ${type} "${name}" (${id})`
    if (details.length > 0) {
      line += '\n    ' + details.join('\n    ')
    }
    return line
  }).join('\n\n')
}

function formatCreated(node: Record<string, unknown>, action = 'Created'): string {
  const type = TYPE_LABELS[node.type as string] || (node.type as string)?.toLowerCase() || 'node'
  const name = node.name || node.characters || ''
  
  const lines = [`\x1b[32m✓\x1b[0m ${action} ${type} "${name}"`]
  lines.push(`  id: ${node.id}`)
  
  const box = formatBox(node as { width?: number; height?: number; x?: number; y?: number })
  if (box) lines.push(`  box: ${box}`)

  const fill = formatFills(node.fills as Array<{ type: string; color?: string }>)
  if (fill) lines.push(`  fill: ${fill}`)

  const stroke = formatStrokes(
    node.strokes as Array<{ type: string; color?: string }>,
    node.strokeWeight as number
  )
  if (stroke) lines.push(`  stroke: ${stroke}`)

  if (node.cornerRadius && node.cornerRadius !== 0) {
    lines.push(`  radius: ${node.cornerRadius}px`)
  }

  if (node.fontSize) {
    lines.push(`  font: ${node.fontSize}px`)
  }

  return lines.join('\n')
}

function formatExport(result: { path?: string }): string {
  if (result.path) {
    return `\x1b[32m✓\x1b[0m Exported to ${result.path}`
  }
  return '\x1b[32m✓\x1b[0m Exported'
}

function formatDeleted(result: { deleted?: boolean }): string {
  if (result.deleted) {
    return '\x1b[32m✓\x1b[0m Deleted'
  }
  return '\x1b[31m✗\x1b[0m Delete failed'
}

function formatPages(pages: Array<{ id: string; name: string }>): string {
  return pages.map((p, i) => `[${i}] "${p.name}" (${p.id})`).join('\n')
}

function formatStatus(status: { pluginConnected: boolean }): string {
  if (status.pluginConnected) {
    return '\x1b[32m✓\x1b[0m Plugin connected'
  }
  return '\x1b[31m✗\x1b[0m Plugin not connected'
}

export function formatResult(result: unknown, context?: string): string {
  if (result === null || result === undefined) {
    return ''
  }

  // String result (e.g., file path)
  if (typeof result === 'string') {
    return result
  }

  // Array of nodes
  if (Array.isArray(result)) {
    if (result.length === 0) return '(empty)'
    if (result[0]?.id && result[0]?.name !== undefined) {
      // Pages or nodes list
      if (result[0]?.type) {
        return formatNodeList(result as Array<Record<string, unknown>>)
      }
      return formatPages(result as Array<{ id: string; name: string }>)
    }
    return JSON.stringify(result, null, 2)
  }

  // Object
  if (typeof result === 'object') {
    const obj = result as Record<string, unknown>

    // Deleted
    if (obj.deleted !== undefined) {
      return formatDeleted(obj as { deleted?: boolean })
    }

    // Export
    if (context === 'export' || obj.path) {
      return formatExport(obj as { path?: string })
    }

    // Status
    if (obj.pluginConnected !== undefined) {
      return formatStatus(obj as { pluginConnected: boolean })
    }

    // Node with id and type (created/updated node)
    if (obj.id && obj.type) {
      if (context === 'create') {
        return formatCreated(obj, 'Created')
      }
      if (context === 'update') {
        return formatCreated(obj, 'Updated')
      }
      return formatNode(obj)
    }

    // Node with just id and name (page)
    if (obj.id && obj.name && !obj.type) {
      return `[page] "${obj.name}" (${obj.id})`
    }

    // Zoom result
    if (obj.center && obj.zoom) {
      return `\x1b[32m✓\x1b[0m Zoomed to fit (${(obj.zoom as number * 100).toFixed(0)}%)`
    }

    // Selection
    if (obj.selection !== undefined) {
      const sel = obj.selection as string[]
      if (sel.length === 0) return '(no selection)'
      return `Selected: ${sel.join(', ')}`
    }

    // Fallback to JSON
    return JSON.stringify(obj, null, 2)
  }

  return String(result)
}

export function printResult(result: unknown, jsonMode = false, context?: string): void {
  if (jsonMode) {
    console.log(JSON.stringify(result, null, 2))
  } else {
    console.log(formatResult(result, context))
  }
}

export function printError(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`\x1b[31m✗\x1b[0m ${message}`)
}
