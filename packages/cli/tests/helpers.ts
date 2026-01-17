const CLI = 'bun run src/index.ts'
const cwd = import.meta.dir + '/..'

export async function run(cmd: string, parseJson: boolean = true): Promise<unknown> {
  const proc = Bun.spawn(['sh', '-c', `${CLI} ${cmd}`], { cwd, stdout: 'pipe', stderr: 'pipe' })
  const stdout = await new Response(proc.stdout).text()
  const stderr = await new Response(proc.stderr).text()
  await proc.exited
  if (proc.exitCode !== 0) throw new Error(stderr || stdout)
  if (!parseJson) return stdout.trim()
  try {
    return JSON.parse(stdout)
  } catch {
    return stdout.trim()
  }
}

export const createdNodes: string[] = []

export function trackNode(id: string) {
  createdNodes.push(id)
}

const TEST_PAGE_NAME = '__figma-use-tests__'
let testPageId: string | null = null
let originalPageId: string | null = null

export async function setupTestPage(): Promise<void> {
  // Save original page
  const currentPage = await run('eval "return {id: figma.currentPage.id}"') as { id: string }
  originalPageId = currentPage.id

  // Find or create test page
  const pages = await run('get pages --json') as { id: string; name: string }[]
  const existingTestPage = pages.find(p => p.name === TEST_PAGE_NAME)
  
  if (existingTestPage) {
    testPageId = existingTestPage.id
    // Clear test page contents
    await run(`page set "${testPageId}" --json`)
    const children = await run(`eval "return figma.currentPage.children.map(n => n.id)"`) as string[]
    for (const childId of children) {
      await run(`node delete ${childId} --json`).catch(() => {})
    }
  } else {
    const page = await run(`create page "${TEST_PAGE_NAME}" --json`) as { id: string }
    testPageId = page.id
  }
  
  await run(`page set "${testPageId}" --json`)
}

export async function teardownTestPage(): Promise<void> {
  // Clean up created nodes
  for (const id of createdNodes) {
    await run(`node delete ${id} --json`).catch(() => {})
  }
  createdNodes.length = 0

  // Return to original page
  if (originalPageId) {
    await run(`page set "${originalPageId}" --json`).catch(() => {})
  }
}

export function getTestPageId(): string | null {
  return testPageId
}
