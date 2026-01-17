import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Clone a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID to clone', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('clone-node', { id: args.id })
      printResult(result, args.json, 'create')
    } catch (e) {
      handleError(e)
    }
  }
})
