import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Find nodes by name' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    name: { type: 'string', description: 'Name to search for', required: true },
    type: { type: 'string', description: 'Filter by type (FRAME, TEXT, RECTANGLE, etc)' },
    exact: { type: 'boolean', description: 'Exact match (default: contains)', default: false }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('find-by-name', {
        name: args.name,
        type: args.type,
        exact: args.exact
      })
      printResult(result, args.json)
    } catch (e) { handleError(e) }
  }
})
