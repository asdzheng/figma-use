import { describe, test, expect, beforeAll, afterAll } from 'bun:test'
import { run, setupTestPage, teardownTestPage, trackNode } from '../helpers.ts'

describe('analyze', () => {
  beforeAll(async () => {
    await setupTestPage('analyze')

    // Create similar frames to form clusters
    for (let i = 0; i < 5; i++) {
      const frame = (await run(
        `create frame --name "Card ${i}" --width 200 --height 100 --x ${i * 220} --y 0 --json`
      )) as { id: string }
      trackNode(frame.id)

      // Add text child to each
      const text = (await run(
        `create text --text "Item ${i}" --x 10 --y 10 --parent ${frame.id} --json`
      )) as { id: string }
      trackNode(text.id)
    }

    // Create different cluster - icons
    for (let i = 0; i < 3; i++) {
      const icon = (await run(
        `create frame --name "Icon ${i}" --width 32 --height 32 --x ${i * 50} --y 150 --json`
      )) as { id: string }
      trackNode(icon.id)
    }
  })

  afterAll(async () => {
    await teardownTestPage()
  })

  describe('clusters', () => {
    test('finds repeated patterns', async () => {
      const result = (await run('analyze clusters --json')) as {
        clusters: Array<{
          signature: string
          nodes: Array<{ id: string; name: string }>
        }>
        totalNodes: number
      }

      expect(result.clusters).toBeInstanceOf(Array)
      expect(result.totalNodes).toBeGreaterThan(0)
    })

    test('clusters have required fields', async () => {
      const result = (await run('analyze clusters --json')) as {
        clusters: Array<{
          signature: string
          nodes: Array<{ id: string; name: string; width: number; height: number }>
          avgWidth: number
          avgHeight: number
          widthRange: number
          heightRange: number
        }>
      }

      if (result.clusters.length > 0) {
        const cluster = result.clusters[0]
        expect(cluster.signature).toBeString()
        expect(cluster.nodes).toBeInstanceOf(Array)
        expect(cluster.avgWidth).toBeNumber()
        expect(cluster.avgHeight).toBeNumber()
        expect(typeof cluster.widthRange).toBe('number')
        expect(typeof cluster.heightRange).toBe('number')
      }
    })

    test('respects min-count filter', async () => {
      const result = (await run('analyze clusters --min-count 3 --json')) as {
        clusters: Array<{ nodes: Array<unknown> }>
      }

      for (const cluster of result.clusters) {
        expect(cluster.nodes.length).toBeGreaterThanOrEqual(3)
      }
    })

    test('respects limit', async () => {
      const result = (await run('analyze clusters --limit 2 --json')) as {
        clusters: Array<unknown>
      }

      expect(result.clusters.length).toBeLessThanOrEqual(2)
    })

    test('respects min-size filter', async () => {
      const result = (await run('analyze clusters --min-size 50 --json')) as {
        clusters: Array<{ nodes: Array<{ width: number; height: number }> }>
      }

      for (const cluster of result.clusters) {
        for (const node of cluster.nodes) {
          expect(node.width).toBeGreaterThanOrEqual(50)
          expect(node.height).toBeGreaterThanOrEqual(50)
        }
      }
    })

    test('groups similar sized frames together', async () => {
      const result = (await run('analyze clusters --json')) as {
        clusters: Array<{
          nodes: Array<{ name: string; width: number; height: number }>
          avgWidth: number
          avgHeight: number
        }>
      }

      // Find cluster with our Card frames (200x100)
      const cardCluster = result.clusters.find(
        (c) => c.avgWidth >= 180 && c.avgWidth <= 220 && c.avgHeight >= 80 && c.avgHeight <= 120
      )

      if (cardCluster) {
        // All nodes in cluster should have similar sizes
        for (const node of cardCluster.nodes) {
          expect(Math.abs(node.width - cardCluster.avgWidth)).toBeLessThan(50)
          expect(Math.abs(node.height - cardCluster.avgHeight)).toBeLessThan(50)
        }
      }
    })

    test('human-readable output includes key info', async () => {
      const output = (await run('analyze clusters --limit 3', false)) as string

      // Should include count indicator
      expect(output).toMatch(/\d+×/)
      // Should include pattern type
      expect(output).toMatch(/frame|component/i)
      // Should include match percentage
      expect(output).toMatch(/\d+% match/)
      // Should include examples
      expect(output).toContain('examples:')
    })
  })
})
