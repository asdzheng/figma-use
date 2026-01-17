import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Zoom viewport to fit nodes' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    ids: { type: 'string', description: 'Comma-separated node IDs (or empty for selection)' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('zoom-to-fit', {
        ids: args.ids ? args.ids.split(',').map(s => s.trim()) : undefined
      })
      printResult(result, args.json)
    } catch (e) { handleError(e) }
  }
})
