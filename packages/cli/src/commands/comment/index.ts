import { defineCommand } from 'citty'
import list from './list.ts'
import add from './add.ts'
import del from './delete.ts'

export default defineCommand({
  meta: { description: 'Manage file comments ' },
  subCommands: {
    list,
    add,
    delete: del
  }
})
