import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const tests = fs.readdirSync('tests').filter(name => name.endsWith('.test.ts')).sort().map(name => path.join('tests', name))
const commands = [
  { name: 'typecheck', display: 'npm run typecheck', args: ['node_modules/typescript/bin/tsc', '--noEmit'] },
  { name: 'tests', display: 'npm test', args: ['node_modules/tsx/dist/cli.mjs', '--test', '--test-reporter=tap', ...tests] },
  { name: 'documentation', display: 'npm run check:docs', args: ['scripts/check-docs.mjs'] },
]
fs.mkdirSync('reviews', { recursive: true })
fs.writeFileSync('reviews/validation.json', JSON.stringify({ status: 'running', startedAt: new Date().toISOString() }, null, 2) + '\n')
fs.writeFileSync('reviews/documentation.log', '')
const results = []
for (const command of commands) {
  const result = spawnSync(process.execPath, command.args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
  const output = (result.stdout ?? '') + (result.stderr ?? '')
  fs.writeFileSync(`reviews/${command.name}.log`, output)
  const summary = command.name === 'tests'
    ? Object.fromEntries([...output.matchAll(/^# (tests|pass|fail|skipped|cancelled) (\d+)$/gm)].map(match => [match[1], Number(match[2])]))
    : undefined
  results.push({ name: command.name, command: command.display, exitCode: result.status, error: result.error?.message, summary })
  console.log(`${command.name}: ${result.status === 0 ? '通过' : '失败'}${summary ? ' ' + JSON.stringify(summary) : ''}`)
  if (result.status !== 0) console.error(output.slice(-6000))
}
const report = { status: results.every(result => result.exitCode === 0) ? 'passed' : 'failed', checkedAt: new Date().toISOString(), node: process.version, buildRun: false, results }
fs.writeFileSync('reviews/validation.json', JSON.stringify(report, null, 2) + '\n')
if (results.some(result => result.exitCode !== 0)) process.exitCode = 1
