import { describe, test, expect, beforeAll, afterAll } from 'bun:test'
import { run, trackNode } from '../helpers.ts'

describe('export guards', () => {
  let nodeId: string

  beforeAll(async () => {
    const rect = await run('create rect --x 0 --y 900 --width 100 --height 100 --name "GuardTest" --json') as { id: string }
    nodeId = rect.id
    trackNode(nodeId)
  })

  afterAll(async () => {
    if (nodeId) {
      await run(`node delete ${nodeId} --json`).catch(() => {})
    }
  })

  test('export node blocks oversized export', async () => {
    try {
      await run(`export node ${nodeId} --scale 100`, false)
      expect(true).toBe(false)
    } catch (e: any) {
      expect(e.message).toContain('exceeds max dimension')
      expect(e.message).toContain('--force')
    }
  })

  test('export node allows with --force', async () => {
    const output = await run(`export node ${nodeId} --scale 2 --output /tmp/guard-test.png`, false) as string
    expect(output).toContain('/tmp/guard-test.png')
  })

  test('screenshot blocks oversized viewport', async () => {
    await run('viewport set --zoom 0.01')
    try {
      await run('export screenshot --scale 2', false)
      expect(true).toBe(false)
    } catch (e: any) {
      expect(e.message).toContain('exceeds')
    }
    await run('viewport set --zoom 1')
  })

  test('screenshot allows with --force', async () => {
    const output = await run('export screenshot --output /tmp/guard-screenshot.png', false) as string
    expect(output).toContain('/tmp/guard-screenshot.png')
  })
})

describe('tree guards', () => {
  test('tree shows node count', async () => {
    const output = await run('node tree --depth 1', false) as string
    expect(output).toMatch(/\d+ nodes/)
  })
})
