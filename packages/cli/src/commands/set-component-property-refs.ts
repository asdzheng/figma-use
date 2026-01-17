import { defineCommand } from 'citty'
import { sendCommand, printResult, handleError } from '../client.ts'

export default defineCommand({
  meta: { description: 'Set component property references of a node' },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' },
    id: { type: 'string', description: 'Node ID', required: true },
    refs: { type: 'string', description: 'References JSON (e.g. {"characters": "propName"})', required: true }
  },
  async run({ args }) {
    try {
      const result = await sendCommand('set-node-component-property-references', {
          id: args.id,
          componentPropertyReferences: JSON.parse(args.refs)
        })
      printResult(result, args.json, 'update')
    } catch (e) {
      handleError(e)
    }
  }
})
