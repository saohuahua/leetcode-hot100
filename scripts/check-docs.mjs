import fs from 'node:fs'
import path from 'node:path'

const errors = []
const manifest = JSON.parse(fs.readFileSync('data/hot100.json', 'utf8'))
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  if (['node_modules', '.git', '.npm-cache'].includes(entry.name)) return []
  const file = path.join(dir, entry.name)
  return entry.isDirectory() ? walk(file) : [file]
})
const files = walk('.')
const ids = manifest.groups.flatMap(g => g.problems.map(p => p.id))
if (ids.length !== 100 || new Set(ids).size !== 100) errors.push('题单必须包含100个唯一题号')
const problemDocuments = files.filter(f => f.startsWith('chapters' + path.sep) && /^\d{4}-.+\.md$/.test(path.basename(f)))
const solutionFiles = files.filter(f => f.startsWith('solutions' + path.sep) && /^\d{4}\.ts$/.test(path.basename(f)))
if (problemDocuments.length !== 100) errors.push(`逐题文档总数应为100 实际${problemDocuments.length}`)
if (solutionFiles.length !== 100) errors.push(`逐题实现总数应为100 实际${solutionFiles.length}`)
const testSources = files.filter(f => f.startsWith('tests' + path.sep) && f.endsWith('.test.ts')).map(f => fs.readFileSync(f, 'utf8')).join('\n')
for (const group of manifest.groups) {
  const dir = path.join('chapters', group.directory)
  for (const name of ['README.md', 'review.md']) if (!fs.existsSync(path.join(dir, name))) errors.push(`缺少 ${dir}/${name}`)
  const reviewPath = path.join(dir, 'review.md')
  if (fs.existsSync(reviewPath) && (fs.readFileSync(reviewPath, 'utf8').match(/<details[> ]/g) || []).length < 3) errors.push(`${group.directory} 迁移练习解析少于三项`)
  if (!fs.existsSync(`tests/${String(group.index).padStart(2, '0')}.test.ts`)) errors.push(`缺少分类测试 ${group.directory}`)
  for (const p of group.problems) {
    const id = String(p.id).padStart(4, '0')
    const matches = files.filter(f => path.dirname(f) === dir && path.basename(f).startsWith(id + '-') && f.endsWith('.md'))
    if (matches.length !== 1) { errors.push(`${p.id} 讲解数量应为1 实际${matches.length}`); continue }
    const source = path.join('solutions', String(group.index).padStart(2, '0'), id + '.ts')
    if (!fs.existsSync(source)) { errors.push(`缺少 ${source}`); continue }
    if (!testSources.includes(`../solutions/${String(group.index).padStart(2, '0')}/${id}.js`)) errors.push(`${p.id} 没有测试导入`)
    const markdown = fs.readFileSync(matches[0], 'utf8')
    const requiredHeadings = [/^## 题目\s*$/m, /^### 官方示例\s*$/m, /^### 约束\s*$/m, /^## 前期思路\s*$/m, /^## 执行过程/m, /^## TypeScript 实现/m]
    const positions = requiredHeadings.map(pattern => markdown.search(pattern))
    if (positions.some(position => position < 0) || positions.some((position, index) => index > 0 && position <= positions[index - 1])) errors.push(`${p.id} 题目 思路 示例或实现章节缺失或顺序异常`)
    const examples = markdown.split('### 官方示例')[1]?.split('### 约束')[0] ?? ''
    const exampleBlocks = examples.split(/^> \*\*示例/gm).slice(1)
    if (exampleBlocks.length === 0 || exampleBlocks.some(block => !block.includes('输入') || !block.includes('输出'))) errors.push(`${p.id} 官方示例缺少输入或输出`)
    const constraints = markdown.split('### 约束')[1]?.split('## 前期思路')[0] ?? ''
    if (!/^\s*- /m.test(constraints)) errors.push(`${p.id} 缺少题目约束列表`)
    const thinking = markdown.split('## 前期思路')[1]?.split(/^## /m)[0] ?? ''
    if ((thinking.match(/^### /gm) || []).length < 3) errors.push(`${p.id} 前期思路缺少直接方法 优化依据或解法推导`)
    const fences = [...markdown.matchAll(/```ts\r?\n([\s\S]*?)```/g)]
    if (fences.length !== 1 || fences[0][1].trim() !== fs.readFileSync(source, 'utf8').trim()) errors.push(`${p.id} 正文实现与源码不一致`)
    const implementationHeading = markdown.search(/^## .*TypeScript.*实现/m)
    if (implementationHeading < 0 || (fences[0]?.index ?? -1) < implementationHeading) errors.push(`${p.id} 实现围栏不在实现章节中`)
    if (/^\s*(?:CODE|TODO|TBD)\s*$/m.test(markdown)) errors.push(`${p.id} 残留生成占位符`)
    const detailCount = (markdown.match(/<details[> ]/g) || []).length
    if (detailCount < 4) errors.push(`${p.id} 缺少口述或三级折叠提示`)
    for (const [label, pattern] of [['复杂度', /复杂度/], ['迁移', /举一反三|变式|迁移/], ['过程示例', /手推|跟着|走一遍|走完|执行过程|状态变化|过程示例/], ['解法复述', /口述|解法复述|算法概述/]]) {
      if (!pattern.test(markdown)) errors.push(`${p.id} 缺少${label}`)
    }
    if (!markdown.includes(p.url)) errors.push(`${p.id} 缺少官方原题链接`)
  }
}
for (const file of files) {
  if (file.endsWith('.md')) {
    const content = fs.readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '')
    for (const match of content.matchAll(/\]\((<[^>]+>|[^)]+)\)/g)) {
      let target = match[1].replace(/^<|>$/g, '').split('#')[0]
      if (!target || /^[a-z]+:/i.test(target)) continue
      try { target = decodeURIComponent(target) } catch {}
      if (!fs.existsSync(path.resolve(path.dirname(file), target))) errors.push(`${file} 链接不存在 ${target}`)
    }
  }
  if (file.endsWith('.ts')) {
    const source = fs.readFileSync(file, 'utf8')
    for (const line of source.split(/\r?\n/)) {
      const at = line.indexOf('//')
      if (at >= 0 && /[\p{P}\p{S}]/u.test(line.slice(at + 2))) errors.push(`${file} 注释含标点或符号 ${line.trim()}`)
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log('通过 100题唯一覆盖 17章导航 题目与思路顺序 官方示例 约束 代码同步 提示结构 本地链接与注释规范')
}
