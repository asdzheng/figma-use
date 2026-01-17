import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Ungroup a group node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Group node ID', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('ungroup-node', { id: args.id })
      printResult(result, args.json)
    } catch (e) { handleError(e) }
  }
})
