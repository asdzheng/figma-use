import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Get children of a node' },
  args: {
    id: { type: 'string', description: 'Node ID', required: true },
    depth: { type: 'string', description: 'Depth (1 = direct children only)', default: '1' }
  },
  async run({ args }) {
    try {
      printResult(await sendCommand('get-children', {
        id: args.id,
        depth: Number(args.depth)
      }))
    } catch (e) { handleError(e) }
  }
})
