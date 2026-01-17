import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Get children of a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    depth: { type: 'string', description: 'Depth (1 = direct children only)', default: '1' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('get-children', {
        id: args.id,
        depth: Number(args.depth)
      })
      printResult(result, args.json, 'get')
    } catch (e) { handleError(e) }
  }
})
