import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set font of a text node' },
  args: {
    id: { type: 'string', description: 'Node ID', required: true },
    fontFamily: { type: 'string', description: 'Font family' },
    fontStyle: { type: 'string', description: 'Font style (Regular, Bold, Medium, etc)' },
    fontSize: { type: 'string', description: 'Font size' }
  },
  async run({ args }) {
    try {
      printResult(await sendCommand('set-font', {
        id: args.id,
        fontFamily: args.fontFamily,
        fontStyle: args.fontStyle,
        fontSize: args.fontSize ? Number(args.fontSize) : undefined
      }))
    } catch (e) { handleError(e) }
  }
})
