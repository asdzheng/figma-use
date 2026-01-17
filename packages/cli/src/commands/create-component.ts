import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Create a component' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    name: { type: 'string', description: 'Component name', required: true },
    parentId: { type: 'string', description: 'Parent node ID' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('create-component', {
          name: args.name,
          parentId: args.parentId
        })
      printResult(result, args.json, 'create')
    } catch (e) {
      handleError(e)
    }
  }
})
