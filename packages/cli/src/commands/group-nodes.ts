import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Group nodes together' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    ids: { type: 'string', description: 'Comma-separated node IDs', required: true },
    name: { type: 'string', description: 'Group name' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('group-nodes', {
        ids: args.ids.split(',').map(s => s.trim()),
        name: args.name
      })
      printResult(result, args.json)
    } catch (e) { handleError(e) }
  }
})
