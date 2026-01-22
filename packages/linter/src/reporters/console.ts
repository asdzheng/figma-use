import type { LintResult, LintMessage, Severity } from '../core/types.ts'

const SEVERITY_ICONS: Record<Severity, string> = {
  error: '✖',
  warning: '⚠',
  info: 'ℹ',
  off: ' ',
}

const SEVERITY_COLORS: Record<Severity, string> = {
  error: '\x1b[31m',   // red
  warning: '\x1b[33m', // yellow
  info: '\x1b[36m',    // cyan
  off: '\x1b[90m',     // gray
}

const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'
const DIM = '\x1b[2m'

export interface ConsoleReporterOptions {
  color?: boolean
  verbose?: boolean
}

export function formatReport(result: LintResult, options: ConsoleReporterOptions = {}): string {
  const { color = true, verbose = false } = options
  const lines: string[] = []

  const c = (code: string, text: string) => (color ? `${code}${text}${RESET}` : text)

  // Group messages by node
  const byNode = new Map<string, LintMessage[]>()
  for (const msg of result.messages) {
    const key = `${msg.nodePath.join('/')} (${msg.nodeId})`
    const existing = byNode.get(key) ?? []
    existing.push(msg)
    byNode.set(key, existing)
  }

  for (const [nodePath, messages] of byNode) {
    // Sort: errors first, then warnings, then info
    messages.sort((a, b) => {
      const order: Record<Severity, number> = { error: 0, warning: 1, info: 2, off: 3 }
      return order[a.severity] - order[b.severity]
    })

    const hasError = messages.some(m => m.severity === 'error')
    const icon = hasError ? c(SEVERITY_COLORS.error, '✖') : c(SEVERITY_COLORS.warning, '⚠')
    lines.push(`${icon} ${c(BOLD, nodePath)}`)

    for (const msg of messages) {
      const sevIcon = c(SEVERITY_COLORS[msg.severity], SEVERITY_ICONS[msg.severity])
      const ruleId = c(DIM, msg.ruleId)
      lines.push(`    ${sevIcon}  ${msg.message}  ${ruleId}`)

      if (verbose && msg.suggest) {
        lines.push(`       ${c(DIM, `→ ${msg.suggest}`)}`)
      }
    }

    lines.push('')
  }

  // Summary line
  const parts: string[] = []
  if (result.errorCount > 0) {
    parts.push(c(SEVERITY_COLORS.error, `${result.errorCount} error${result.errorCount !== 1 ? 's' : ''}`))
  }
  if (result.warningCount > 0) {
    parts.push(c(SEVERITY_COLORS.warning, `${result.warningCount} warning${result.warningCount !== 1 ? 's' : ''}`))
  }
  if (result.infoCount > 0) {
    parts.push(c(SEVERITY_COLORS.info, `${result.infoCount} info`))
  }

  if (parts.length > 0) {
    lines.push('─'.repeat(60))
    lines.push(parts.join('  '))

    if (result.fixableCount > 0) {
      lines.push(c(DIM, `\nRun with --fix to auto-fix ${result.fixableCount} issue${result.fixableCount !== 1 ? 's' : ''}`))
    }
  } else {
    lines.push(c('\x1b[32m', '✔ No issues found'))
  }

  return lines.join('\n')
}

export function formatJSON(result: LintResult): string {
  return JSON.stringify(result, null, 2)
}
