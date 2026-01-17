import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Get current viewport position and zoom' },
  args: { json: { type: 'boolean', description: 'Output as JSON' } },
  async run({ args }) {
    try {
      const result = await sendCommand('get-viewport')
      printResult(result, args.json, 'get')
    } catch (e) { handleError(e) }
  }
})
