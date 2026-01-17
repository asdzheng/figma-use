import { beforeAll, afterAll } from 'bun:test'
import { setupTestPage, teardownTestPage } from './helpers.ts'

beforeAll(async () => {
  await setupTestPage()
})

afterAll(async () => {
  await teardownTestPage()
})
