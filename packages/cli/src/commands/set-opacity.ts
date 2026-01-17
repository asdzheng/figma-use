import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set node opacity' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    opacity: { type: 'string', description: 'Opacity (0-1)', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-opacity', {
        id: args.id,
        opacity: Number(args.opacity)
      })
      printResult(result, args.json, 'update')
    } catch (e) { handleError(e) }
  }
})
