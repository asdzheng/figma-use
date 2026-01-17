import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set auto-layout properties of a frame' },
  args: {
    id: { type: 'string', description: 'Node ID', required: true },
    mode: { type: 'string', description: 'Layout mode: HORIZONTAL, VERTICAL, NONE' },
    wrap: { type: 'boolean', description: 'Wrap children' },
    itemSpacing: { type: 'string', description: 'Spacing between items' },
    counterSpacing: { type: 'string', description: 'Spacing between wrapped rows/columns' },
    padding: { type: 'string', description: 'Padding (single or "top,right,bottom,left")' },
    primaryAlign: { type: 'string', description: 'Primary axis: MIN, CENTER, MAX, SPACE_BETWEEN' },
    counterAlign: { type: 'string', description: 'Counter axis: MIN, CENTER, MAX, BASELINE' },
    sizingH: { type: 'string', description: 'Horizontal sizing: FIXED, HUG, FILL' },
    sizingV: { type: 'string', description: 'Vertical sizing: FIXED, HUG, FILL' }
  },
  async run({ args }) {
    try {
      let paddingObj
      if (args.padding) {
        const parts = args.padding.split(',').map(Number)
        if (parts.length === 1) {
          paddingObj = { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] }
        } else if (parts.length === 4) {
          paddingObj = { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] }
        }
      }
      printResult(await sendCommand('set-auto-layout', {
        id: args.id,
        mode: args.mode,
        wrap: args.wrap,
        itemSpacing: args.itemSpacing ? Number(args.itemSpacing) : undefined,
        counterSpacing: args.counterSpacing ? Number(args.counterSpacing) : undefined,
        padding: paddingObj,
        primaryAlign: args.primaryAlign,
        counterAlign: args.counterAlign,
        sizingH: args.sizingH,
        sizingV: args.sizingV
      }))
    } catch (e) { handleError(e) }
  }
})
