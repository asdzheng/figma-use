import { describe, test, expect, beforeAll, afterAll } from 'bun:test'
import { run, setupTestPage, teardownTestPage } from '../helpers.ts'
import { resolve } from 'path'

const CARD_TSX = resolve(import.meta.dir, '../fixtures/Card.figma.tsx')

describe('render', () => {
  beforeAll(() => setupTestPage('render'))
  afterAll(() => teardownTestPage())

  test('renders simple TSX component', async () => {
    const result = await run(`render "${CARD_TSX}" --props '{"title": "Test", "items": ["A"]}' --json`) as Array<{ id: string; name: string }>
    
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0].name).toBe('Card')
  })

  test('renders with multiple items (tests loops)', async () => {
    const result = await run(`render "${CARD_TSX}" --props '{"title": "Products", "items": ["iPhone", "MacBook", "AirPods"]}' --json`) as Array<{ id: string; name: string }>
    
    expect(result.length).toBe(17)
  })

  test('renders into parent node', async () => {
    const parent = await run('create frame --x 0 --y 0 --width 500 --height 500 --name "Container" --json') as { id: string }
    
    const result = await run(`render "${CARD_TSX}" --props '{"title": "Nested", "items": ["X"]}' --parent ${parent.id} --json`) as Array<{ id: string; name: string }>
    
    const cardInfo = await run(`node get ${result[0].id} --json`) as { parentId?: string }
    expect(cardInfo.parentId).toBe(parent.id)
  })

  test('applies layout props correctly', async () => {
    const result = await run(`render "${CARD_TSX}" --props '{"title": "Layout", "items": ["A"]}' --json`) as Array<{ id: string; name: string }>
    
    const card = await run(`node get ${result[0].id} --json`) as { layoutMode?: string; itemSpacing?: number }
    expect(card.layoutMode).toBe('VERTICAL')
    expect(card.itemSpacing).toBe(16)
  })

  test('applies padding correctly', async () => {
    const result = await run(`render "${CARD_TSX}" --props '{"title": "Padding", "items": ["A"]}' --json`) as Array<{ id: string; name: string }>
    
    const card = await run(`node get ${result[0].id} --json`) as { padding?: { top: number; left: number } }
    expect(card.padding?.top).toBe(24)
    expect(card.padding?.left).toBe(24)
  })

  test('applies fill colors', async () => {
    const result = await run(`render "${CARD_TSX}" --props '{"title": "Colors", "items": ["A"]}' --json`) as Array<{ id: string; name: string }>
    
    const card = await run(`node get ${result[0].id} --json`) as { fills?: Array<{ color: string }> }
    expect(card.fills?.[0]?.color).toBe('#FFFFFF')
  })

  test('applies corner radius', async () => {
    const result = await run(`render "${CARD_TSX}" --props '{"title": "Radius", "items": ["A"]}' --json`) as Array<{ id: string; name: string }>
    
    const card = await run(`node get ${result[0].id} --json`) as { cornerRadius?: number }
    expect(card.cornerRadius).toBe(12)
  })

  test('creates text nodes with content', async () => {
    const result = await run(`render "${CARD_TSX}" --props '{"title": "Hello World", "items": ["A"]}' --json`) as Array<{ id: string; name: string }>
    
    const titleNode = result.find(n => n.name === 'Title')
    expect(titleNode).toBeDefined()
    
    const titleInfo = await run(`node get ${titleNode!.id} --json`) as { characters?: string }
    expect(titleInfo.characters).toBe('Hello World')
  })

  test('handles variant prop', async () => {
    const primaryResult = await run(`render "${CARD_TSX}" --props '{"title": "Primary", "items": ["A"]}' --json`) as Array<{ id: string; name: string }>
    const primaryButton = primaryResult.find(n => n.name === 'Primary Button')
    const primaryInfo = await run(`node get ${primaryButton!.id} --json`) as { fills?: Array<{ color: string }> }
    expect(primaryInfo.fills?.[0]?.color).toBe('#3B82F6')
    
    const secondaryResult = await run(`render "${CARD_TSX}" --props '{"title": "Secondary", "items": ["A"], "variant": "secondary"}' --json`) as Array<{ id: string; name: string }>
    const secondaryButton = secondaryResult.find(n => n.name === 'Primary Button')
    const secondaryInfo = await run(`node get ${secondaryButton!.id} --json`) as { fills?: Array<{ color: string }> }
    expect(secondaryInfo.fills?.[0]?.color).toBe('#6B7280')
  })

  test('fails gracefully for missing file', async () => {
    await expect(run('render nonexistent.tsx --json')).rejects.toThrow(/not found/i)
  })

  test('fails gracefully for missing export', async () => {
    await expect(run(`render "${CARD_TSX}" --export NonExistent --json`)).rejects.toThrow(/not found/i)
  })
})
