import { defineCommand } from 'citty'
import { getLocalPlugins } from '../../cdp-api.ts'
import { printResult } from '../../output.ts'

export default defineCommand({
  meta: {
    description: 'List local development plugins'
  },
  args: {
    json: { type: 'boolean', description: 'Output as JSON' }
  },
  async run({ args }) {
    const plugins = await getLocalPlugins()

    if (args.json) {
      printResult(plugins, true)
    } else {
      if (plugins.length === 0) {
        console.log('No local plugins found')
        return
      }
      for (const p of plugins) {
        console.log(`${p.name} (${p.plugin_id})`)
        console.log(`  Path: ${p.localFilePath}`)
      }
    }
  }
})
