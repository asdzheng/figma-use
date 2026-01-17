import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set node locked state' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    locked: { type: 'boolean', description: 'Locked', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-locked', {
        id: args.id,
        locked: args.locked
      })
      printResult(result, args.json, 'update')
    } catch (e) { handleError(e) }
  }
})
