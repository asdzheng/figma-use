import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Select nodes in Figma UI' },
  args: {
    ids: { type: 'string', description: 'Comma-separated node IDs', required: true }
  },
  async run({ args }) {
    try {
      printResult(await sendCommand('select-nodes', {
        ids: args.ids.split(',').map(s => s.trim())
      }))
    } catch (e) { handleError(e) }
  }
})
