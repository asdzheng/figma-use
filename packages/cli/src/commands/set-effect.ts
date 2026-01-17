import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set effect (shadow, blur) on a node' },
  args: {
    id: { type: 'string', description: 'Node ID', required: true },
    type: { type: 'string', description: 'Effect type: DROP_SHADOW, INNER_SHADOW, BLUR', required: true },
    color: { type: 'string', description: 'Shadow color (hex with alpha, e.g. #00000040)' },
    offsetX: { type: 'string', description: 'Shadow X offset' },
    offsetY: { type: 'string', description: 'Shadow Y offset' },
    radius: { type: 'string', description: 'Blur radius' },
    spread: { type: 'string', description: 'Shadow spread' }
  },
  async run({ args }) {
    try {
      printResult(await sendCommand('set-effect', {
        id: args.id,
        type: args.type,
        color: args.color,
        offsetX: args.offsetX ? Number(args.offsetX) : undefined,
        offsetY: args.offsetY ? Number(args.offsetY) : undefined,
        radius: args.radius ? Number(args.radius) : undefined,
        spread: args.spread ? Number(args.spread) : undefined
      }))
    } catch (e) { handleError(e) }
  }
})
