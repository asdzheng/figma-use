import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Subtract nodes (boolean operation)' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    ids: { type: 'string', description: 'Comma-separated node IDs', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('boolean-operation', {
        ids: args.ids.split(',').map(s => s.trim()),
        operation: 'SUBTRACT'
      })
      printResult(result, args.json)
    } catch (e) { handleError(e) }
  }
})
