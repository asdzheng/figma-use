import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Switch to a page' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Page ID', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-current-page', { id: args.id })
      printResult(result, args.json, 'update')
    } catch (e) { handleError(e) }
  }
})
