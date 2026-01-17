import { defineCommand } from 'citty'
import { sendCommand } from '../client.ts'
import { printResult } from '../output.ts'

export default defineCommand({
  meta: { description: 'Execute arbitrary code in Figma plugin context' },
  args: {
    code: { type: 'positional', description: 'JavaScript code to execute', required: true },
    json: { type: 'boolean', description: 'Output raw JSON' }
  },
  async run({ args }) {
    const result = await sendCommand('eval', { code: args.code })
    printResult(result, args.json)
  }
})
