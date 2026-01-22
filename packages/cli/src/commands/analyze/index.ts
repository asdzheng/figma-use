import { defineCommand } from 'citty'

export default defineCommand({
  meta: { description: 'Analyze design patterns' },
  subCommands: {
    clusters: () => import('./clusters.ts').then((m) => m.default),
  },
})
