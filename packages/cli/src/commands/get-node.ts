import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Get node info' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('get-node-info', { id: args.id })
      printResult(result, args.json, 'get')
    } catch (e) {
      handleError(e)
    }
  }
})
