import { defineCommand } from 'citty'
import install from './install.ts'
import list from './list.ts'
import run from './run.ts'

export default defineCommand({
  meta: {
    description: 'Manage plugins'
  },
  subCommands: {
    install,
    list,
    run
  }
})
