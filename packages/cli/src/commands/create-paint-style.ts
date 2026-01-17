import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Create a paint/color style' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    name: { type: 'string', description: 'Style name', required: true },
    color: { type: 'string', description: 'Hex color (e.g. #FF0000)', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('create-paint-style', {
        name: args.name,
        color: args.color
      })
      printResult(result, args.json, 'create')
    } catch (e) { handleError(e) }
  }
})
