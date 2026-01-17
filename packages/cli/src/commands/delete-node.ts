import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Delete a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('delete-node', { id: args.id })
      printResult(result, args.json, 'delete')
    } catch (e) {
      handleError(e)
    }
  }
})
