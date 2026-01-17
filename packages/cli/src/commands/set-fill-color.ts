import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set fill color of a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    color: { type: 'string', description: 'Color (hex, e.g. #FF0000FF)', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-fill-color', {
          id: args.id,
          color: args.color
        })
      printResult(result, args.json, 'update')
    } catch (e) {
      handleError(e)
    }
  }
})
