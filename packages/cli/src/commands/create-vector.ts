import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Create a vector from SVG path' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    x: { type: 'string', description: 'X position', required: true },
    y: { type: 'string', description: 'Y position', required: true },
    path: { type: 'string', description: 'SVG path data', required: true },
    name: { type: 'string', description: 'Node name' },
    parentId: { type: 'string', description: 'Parent node ID' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('create-vector', {
        x: Number(args.x),
        y: Number(args.y),
        path: args.path,
        name: args.name,
        parentId: args.parentId
      })
      printResult(result, args.json, 'create')
    } catch (e) { handleError(e) }
  }
})
