import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Get local styles (paint, text, effect, grid)' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    type: { type: 'string', description: 'Style type: paint, text, effect, grid, or all', default: 'all' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('get-local-styles', { type: args.type })
      printResult(result, args.json, 'get')
    } catch (e) { handleError(e) }
  }
})
