# Development Guide

## Architecture

```
packages/
  proxy/    # Elysia WebSocket server (port 38451)
  cli/      # Citty-based CLI, 73 commands
  plugin/   # Figma plugin (esbuild, ES2015 target)
```

## Build & Test

```bash
bun install
bun run build           # Build all packages
bun test                # Run 73 integration tests (requires Figma open with plugin)
```

## Adding Commands

1. Create `packages/cli/src/commands/my-command.ts`:
```typescript
import { defineCommand } from 'citty'
import { sendCommand } from '../client.ts'
import { printResult } from '../output.ts'

export default defineCommand({
  meta: { description: 'My command' },
  args: {
    id: { type: 'string', required: true },
    json: { type: 'boolean', description: 'Output as JSON' }
  },
  async run({ args }) {
    const result = await sendCommand('my-command', { id: args.id })
    printResult(result, args.json)
  }
})
```

2. Export from `packages/cli/src/commands/index.ts`

3. Add handler in `packages/plugin/src/main.ts`:
```typescript
case 'my-command': {
  const { id } = args as { id: string }
  const node = await figma.getNodeByIdAsync(id)
  return serializeNode(node)
}
```

4. Add test in `packages/cli/tests/commands.test.ts`

## Conventions

- Commands: kebab-case (`create-rectangle`, `set-fill-color`)
- Colors: hex format `#RGB`, `#RRGGBB`, `#RRGGBBAA`
- Output: human-readable by default, `--json` for machine parsing
- Inline styles: create commands accept `--fill`, `--stroke`, `--radius`, etc.

## Plugin Build

Plugin uses esbuild (not Bun) because Figma requires ES2015. Build outputs to `packages/plugin/dist/`.

## Release

```bash
# Bump version in package.json
git add -A && git commit -m "v0.1.x"
git tag v0.1.x
git push && git push --tags
npm publish --access public
```
