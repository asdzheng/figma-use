import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set blend mode of a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    mode: { type: 'string', description: 'Blend mode: NORMAL, DARKEN, MULTIPLY, SCREEN, OVERLAY, etc', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-blend-mode', {
        id: args.id,
        mode: args.mode
      })
      printResult(result, args.json, 'update')
    } catch (e) { handleError(e) }
  }
})
