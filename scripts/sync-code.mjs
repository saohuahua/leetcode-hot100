import fs from 'node:fs'
import path from 'node:path'

const manifest = JSON.parse(fs.readFileSync('data/hot100.json', 'utf8'))
let changed = 0
for (const group of manifest.groups) {
  const directory = path.join('chapters', group.directory)
  if (!fs.existsSync(directory)) continue
  for (const problem of group.problems) {
    const id = String(problem.id).padStart(4, '0')
    const file = fs.readdirSync(directory).find(name => name.startsWith(id + '-') && name.endsWith('.md'))
    const source = path.join('solutions', String(group.index).padStart(2, '0'), id + '.ts')
    if (!file || !fs.existsSync(source)) continue
    const target = path.join(directory, file)
    const markdown = fs.readFileSync(target, 'utf8')
    const code = fs.readFileSync(source, 'utf8').trimEnd()
    const fences = [...markdown.matchAll(/```ts\r?\n[\s\S]*?```/g)]
    const heading = markdown.search(/^## .*TypeScript.*实现/m)
    if (fences.length !== 1 || heading < 0 || fences[0].index < heading) throw new Error(`先修复实现章节结构再同步 ${target}`)
    const updated = markdown.replace(/```ts\r?\n[\s\S]*?```/, () => '```ts\n' + code + '\n```')
    if (updated !== markdown) {
      fs.writeFileSync(target, updated)
      changed++
    }
  }
}
console.log(`同步了 ${changed} 篇实现围栏`)
