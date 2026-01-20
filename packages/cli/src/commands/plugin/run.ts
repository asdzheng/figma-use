import { defineCommand } from 'citty'
import { runLocalPlugin } from '../../cdp-api.ts'

export default defineCommand({
  meta: {
    description: 'Run a local development plugin'
  },
  args: {
    name: { type: 'positional', description: 'Plugin name', required: true }
  },
  async run({ args }) {
    await runLocalPlugin(args.name)
    console.log(`Plugin "${args.name}" launched`)
  }
})
