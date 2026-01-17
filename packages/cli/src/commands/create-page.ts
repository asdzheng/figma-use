import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Create a new page' },
  args: {
    name: { type: 'string', description: 'Page name', required: true }
  },
  async run({ args }) {
    try {
      printResult(await sendCommand('create-page', { name: args.name }))
    } catch (e) { handleError(e) }
  }
})
