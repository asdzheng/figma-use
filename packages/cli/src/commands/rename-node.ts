import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Rename a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    name: { type: 'string', description: 'New name', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('rename-node', { id: args.id, name: args.name })
      printResult(result, args.json)
    } catch (e) { handleError(e) }
  }
})
