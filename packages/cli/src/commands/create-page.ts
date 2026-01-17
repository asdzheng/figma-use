import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Create a new page' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    name: { type: 'string', description: 'Page name', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('create-page', { name: args.name })
      printResult(result, args.json, 'create')
    } catch (e) { handleError(e) }
  }
})
