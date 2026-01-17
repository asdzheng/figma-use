import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set rotation of a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    angle: { type: 'string', description: 'Rotation angle in degrees', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-rotation', {
        id: args.id,
        angle: Number(args.angle)
      })
      printResult(result, args.json, 'update')
    } catch (e) { handleError(e) }
  }
})
