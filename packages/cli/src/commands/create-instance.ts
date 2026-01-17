import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Create an instance of a component' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    componentId: { type: 'string', description: 'Component ID', required: true },
    x: { type: 'string', description: 'X coordinate' },
    y: { type: 'string', description: 'Y coordinate' },
    name: { type: 'string', description: 'Instance name' },
    parentId: { type: 'string', description: 'Parent node ID' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('create-instance', {
          componentId: args.componentId,
          x: args.x ? Number(args.x) : undefined,
          y: args.y ? Number(args.y) : undefined,
          name: args.name,
          parentId: args.parentId
        })
      printResult(result, args.json, 'create')
    } catch (e) {
      handleError(e)
    }
  }
})
