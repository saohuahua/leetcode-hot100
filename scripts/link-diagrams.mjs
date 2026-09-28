import fs from 'node:fs'

const entries = [
  ['chapters/03-滑动窗口/0003-无重复字符的最长子串.md', 'assets/0003-window.svg', 'abba 的窗口变化', '图按第2步到第4步向下读，绿色表示当前合法窗口。最后的a此前出现于下标0，已经在窗口之外，所以左端保持2，不退回1。图省略只有一个a的第1步。'],
  ['chapters/07-链表/0206-反转链表.md', 'assets/0206-reverse.svg', '反转链表时先保留后继再改连接', '图展示处理节点2的一轮：先用next保存节点3，再让节点2指回节点1，最后推进previous与current。箭头表示节点引用，变量换指向不会自动创建新节点。图中的next对应实现中保存原后继的临时变量。'],
  ['chapters/16-多维动态规划/0062-不同路径.md', 'assets/0062-paths.svg', '不同路径的上方与左方依赖', '补充用三行三列展示依赖关系，图中的每个数都是到达该格的路线数量。终点的6由上方3与左方3相加，因为最后一步只能向下或向右，这两类互不重叠。按行填表时依赖项已经算好。下表再手推更小的两行三列。'],
]
for (const [file, svg, title, caption] of entries) {
  const source = fs.readFileSync(file, 'utf8')
  if (source.includes(svg)) continue
  const insertion = `![${title}](${svg})\n\n${caption}\n\n`
  const heading = source.match(/^## (?:\d+ )?(?:执行过程|状态变化|过程示例|跟着|手推)[^\n]*/m)?.[0]
  if (!heading) throw new Error(`找不到执行示例段 ${file}`)
  fs.writeFileSync(file, source.replace(heading, insertion + heading))
}
console.log('三个SVG已接入正文')
