import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set text content of a text node' },
  args: {
    id: { type: 'string', description: 'Node ID', required: true },
    text: { type: 'string', description: 'New text content', required: true }
  },
  async run({ args }) {
    try {
      printResult(await sendCommand('set-text', { id: args.id, text: args.text }))
    } catch (e) { handleError(e) }
  }
})
