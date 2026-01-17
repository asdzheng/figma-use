import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set blend mode of a node' },
  args: {
    id: { type: 'string', description: 'Node ID', required: true },
    mode: { type: 'string', description: 'Blend mode: NORMAL, DARKEN, MULTIPLY, SCREEN, OVERLAY, etc', required: true }
  },
  async run({ args }) {
    try {
      printResult(await sendCommand('set-blend-mode', {
        id: args.id,
        mode: args.mode
      }))
    } catch (e) { handleError(e) }
  }
})
