import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Create a text node' },
  args: {
    x: { type: 'string', description: 'X coordinate', required: true },
    y: { type: 'string', description: 'Y coordinate', required: true },
    text: { type: 'string', description: 'Text content', required: true },
    fontSize: { type: 'string', description: 'Font size' },
    fontFamily: { type: 'string', description: 'Font family (default: Inter)' },
    fontStyle: { type: 'string', description: 'Font style (Regular, Bold, Medium, etc)' },
    fill: { type: 'string', description: 'Text color (hex)' },
    opacity: { type: 'string', description: 'Opacity (0-1)' },
    name: { type: 'string', description: 'Node name' },
    parentId: { type: 'string', description: 'Parent node ID' }
  },
  async run({ args }) {
    try {
      printResult(
        await sendCommand('create-text', {
          x: Number(args.x),
          y: Number(args.y),
          text: args.text,
          fontSize: args.fontSize ? Number(args.fontSize) : undefined,
          fontFamily: args.fontFamily,
          fontStyle: args.fontStyle,
          fill: args.fill,
          opacity: args.opacity ? Number(args.opacity) : undefined,
          name: args.name,
          parentId: args.parentId
        })
      )
    } catch (e) {
      handleError(e)
    }
  }
})
