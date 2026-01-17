import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set instance properties' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Instance ID', required: true },
    properties: { type: 'string', description: 'Properties JSON', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-instance-properties', {
          instanceId: args.id,
          properties: JSON.parse(args.properties)
        })
      printResult(result, args.json, 'update')
    } catch (e) {
      handleError(e)
    }
  }
})
