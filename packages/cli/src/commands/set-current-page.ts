import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Switch to a page' },
  args: {
    id: { type: 'string', description: 'Page ID', required: true }
  },
  async run({ args }) {
    try {
      printResult(await sendCommand('set-current-page', { id: args.id }))
    } catch (e) { handleError(e) }
  }
})
