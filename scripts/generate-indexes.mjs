import fs from 'node:fs'
import path from 'node:path'

const manifest = JSON.parse(fs.readFileSync('data/hot100.json', 'utf8'))
const problemPath = (group, p) => {
  const dir = `chapters/${group.directory}`
  const id = String(p.id).padStart(4, '0')
  const file = fs.existsSync(dir) && fs.readdirSync(dir).find(f => f.startsWith(id + '-') && f.endsWith('.md'))
  return `${dir}/${file || `${id}-${p.title}.md`}`
}
const link = (label, target) => `[${label}](<${target}>)`
const catalog = ['# 官方题单与教材索引', '', `核对日期 ${manifest.checkedAt}。来源为 [力扣官方热题 100](${manifest.source})。共 17 类 100 题。分类用于归档，学习顺序见 [总导航](README.md)。`, '']
const progress = ['# 学习进度表', '', '本表分别记录题意理解、朴素方案、解法复述、过程推演与独立实现五项能力，各项独立确认。空框表示尚未确认掌握。教材交付与验证状态见 [审阅记录](reviews/README.md)。', '', '| 题目 | 复述题意 | 朴素方案 | 解法复述 | 过程推演 | 独立编码 |', '| --- | --- | --- | --- | --- | --- |']
for (const group of manifest.groups) {
  catalog.push(`## ${group.directory}`, '', `${link('基础教材', `chapters/${group.directory}/README.md`)} · ${link('复习与迁移', `chapters/${group.directory}/review.md`)}`, '', '| 题号 | 题目讲解 | 难度 | 原题 |', '| --- | --- | --- | --- |')
  for (const p of group.problems) {
    const target = problemPath(group, p)
    const difficulty = { EASY: '简单', MEDIUM: '中等', HARD: '困难' }[p.difficulty]
    catalog.push(`| ${p.id} | ${link(p.title, target)} | ${difficulty} | [力扣](${p.url}) |`)
    progress.push(`| ${link(`${p.id} ${p.title}`, target)} | ☐ | ☐ | ☐ | ☐ | ☐ |`)
  }
  catalog.push('')
}
fs.writeFileSync('CATALOG.md', catalog.join('\n') + '\n')
if (!fs.existsSync('PROGRESS.md')) fs.writeFileSync('PROGRESS.md', progress.join('\n') + '\n')
const all = manifest.groups.flatMap(group => group.problems.map(p => ({ group, p })))
let seed = 20260928
for (let i = all.length - 1; i > 0; i--) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  const j = seed % (i + 1)
  ;[all[i], all[j]] = [all[j], all[i]]
}
const mixed = ['# 混合复习入口', '', '本页隐藏算法分类，采用固定混合题序，用于检验独立识别方法的能力。练习时先依据原题说明朴素方案与优化依据，再查阅折叠区内的教材。题目未按难度排序，可依据已完成的先修内容选择。', '', '复习记录按题意理解、关键观察、状态设计与实现四个环节分类，便于定位需要补充的知识。教材链接路径包含分类信息，因此在完成独立分析后查阅。', '']
for (let i = 0; i < all.length; i++) {
  const { group, p } = all[i]
  mixed.push(`## ${i + 1} · ${p.id} ${p.title}`, '', `[题目链接](${p.url})`, '', '<details><summary>参考教材</summary>', '', link('题目讲解', problemPath(group, p)), '', '</details>', '')
}
fs.writeFileSync('MIXED-PRACTICE.md', mixed.join('\n') + '\n')
console.log('已生成题单与混合入口 学习进度表仅首次创建')
