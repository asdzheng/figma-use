import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set constraints of a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    horizontal: { type: 'string', description: 'Horizontal: MIN, CENTER, MAX, STRETCH, SCALE' },
    vertical: { type: 'string', description: 'Vertical: MIN, CENTER, MAX, STRETCH, SCALE' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-constraints', {
        id: args.id,
        horizontal: args.horizontal,
        vertical: args.vertical
      })
      printResult(result, args.json, 'update')
    } catch (e) { handleError(e) }
  }
})
