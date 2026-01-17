import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Delete a component property' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    componentId: { type: 'string', description: 'Component ID', required: true },
    name: { type: 'string', description: 'Property name', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('delete-component-property', {
          componentId: args.componentId,
          name: args.name
        })
      printResult(result, args.json, 'delete')
    } catch (e) {
      handleError(e)
    }
  }
})
