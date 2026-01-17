import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set parent of a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    parentId: { type: 'string', description: 'Parent node ID', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-parent-id', {
          id: args.id,
          parentId: args.parentId
        })
      printResult(result, args.json, 'update')
    } catch (e) {
      handleError(e)
    }
  }
})
