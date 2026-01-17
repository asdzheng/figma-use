import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Import SVG as vector node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    svg: { type: 'string', description: 'SVG string', required: true },
    x: { type: 'string', description: 'X position', default: '0' },
    y: { type: 'string', description: 'Y position', default: '0' },
    name: { type: 'string', description: 'Node name' },
    parentId: { type: 'string', description: 'Parent node ID' }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('import-svg', {
        svg: args.svg,
        x: Number(args.x),
        y: Number(args.y),
        name: args.name,
        parentId: args.parentId
      })
      printResult(result, args.json, 'create')
    } catch (e) { handleError(e) }
  }
})
