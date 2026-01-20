// Embeds packages/plugin/dist/rpc.js into packages/cli/src/rpc-bundle.ts

const rpcCode = await Bun.file('packages/plugin/dist/rpc.js').text()

const output = `// Auto-generated - do not edit
// Contains the RPC code to inject into Figma via CDP

export const RPC_BUNDLE = ${JSON.stringify(rpcCode)}
`

await Bun.write('packages/cli/src/rpc-bundle.ts', output)

console.log(`✓ RPC bundle embedded (${(rpcCode.length / 1024).toFixed(1)}KB)`)
