import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set node visibility' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    visible: { type: 'boolean', description: 'Visible', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-visible', {
        id: args.id,
        visible: args.visible
      })
      printResult(result, args.json, 'update')
    } catch (e) { handleError(e) }
  }
})
