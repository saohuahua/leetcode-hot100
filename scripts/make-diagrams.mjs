import fs from 'node:fs'
import path from 'node:path'

const header = (title, description, body, height = 440) => `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${height}" viewBox="0 0 960 ${height}" role="img" aria-labelledby="title desc"><title id="title">${title}</title><desc id="desc">${description}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#34577a"/></marker></defs><style>text{font-family:'Microsoft YaHei','Noto Sans CJK SC',sans-serif;fill:#223344;font-size:21px}.title{font-size:27px;font-weight:700}.small{font-size:18px}.label{font-size:20px;font-weight:600}.box{fill:#edf3f8;stroke:#91a7bb;stroke-width:2}.active{fill:#e1f1e8;stroke:#4d8b68;stroke-width:2}.arrow{stroke:#34577a;stroke-width:2.5;fill:none;marker-end:url(#arrow)}</style><rect width="960" height="${height}" fill="#fffdf9"/><text x="32" y="44" class="title">${title}</text>${body}</svg>`
const box = (x, y, label, active = false, width = 66) => `<rect x="${x}" y="${y}" width="${width}" height="50" rx="8" class="${active ? 'active' : 'box'}"/><text x="${x + width / 2}" y="${y + 33}" text-anchor="middle">${label}</text>`
const write = (directory, filename, content) => {
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, filename), content + '\n')
}

let body = '<text x="32" y="80" class="small">绿色是当前合法区间 灰色是区间外字符 下标从零开始</text>'
for (const [row, right, left, reason] of [[0, 1, 0, '读到第一个 b  区间为 ab'], [1, 2, 2, '再遇 b  左端越过旧 b  变成 b'], [2, 3, 2, '再遇 a  旧 a 已在区间外  左端不后退']]) {
  const y = 110 + row * 100
  body += `<text x="32" y="${y + 30}" class="label">第 ${right + 1} 步</text>`
  for (let i = 0; i < 4; i++) body += box(145 + i * 78, y, 'abba'[i], i >= left && i <= right)
  body += `<text x="490" y="${y + 27}" class="small">${reason}</text><text x="490" y="${y + 54}" class="small">left = ${left}　right = ${right}</text>`
}
body += '<text x="32" y="424" class="small">最后区间是 ba  不能因为 a 曾在下标零出现 就把 left 改回一</text>'
write('chapters/03-滑动窗口/assets', '0003-window.svg', header('abba 的左边界为什么不能后退', '从ab到b再到ba 旧字符位置在当前窗口外时不能让左边界后退', body, 450))

body = '<text x="32" y="82" class="small">处理节点 2 时 先保存原后继 再改箭头 最后移动两个工作指针</text>'
for (let row = 0; row < 3; row++) {
  const y = 117 + row * 102
  body += `<text x="32" y="${y + 31}" class="label">${['保存后继', '反转连接', '推进状态'][row]}</text>`
  body += box(170, y, '1') + box(330, y, '2', true) + box(490, y, '3')
  body += `<text x="85" y="${y + 32}" class="small"></text><path d="M170 ${y + 25} H135" class="arrow"/><text x="103" y="${y + 61}" class="small">null</text>`
  if (row === 0) body += `<path d="M396 ${y + 25} H488" class="arrow"/>`
  else body += `<path d="M330 ${y + 25} H238" class="arrow"/>`
  body += `<text x="620" y="${y + 24}" class="small">${['previous → 1　current → 2', 'current.next → previous', 'previous → 2　current → 3'][row]}</text>`
  body += `<text x="620" y="${y + 51}" class="small">${['next 保存节点 3', 'next 仍然保住节点 3', '下一轮继续处理节点 3'][row]}</text>`
}
body += '<text x="32" y="441" class="small">图省略节点 3 指向 null 的固定连接  所有数字是节点值 箭头表示引用</text>'
write('chapters/07-链表/assets', '0206-reverse.svg', header('反转链表 一轮中三个动作的顺序', '先保留节点2的原后继3 再令2指向1 最后previous指向2 current指向3', body, 467))

body = '<text x="32" y="82" class="small">每格记录到达它的路线数 只能向右或向下 所以来源只有上方与左方</text>'
const ways = [[1, 1, 1], [1, 2, 3], [1, 3, 6]]
for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) body += box(100 + c * 115, 117 + r * 90, String(ways[r][c]), r === 2 && c === 2, 78)
body += '<path d="M369 258 V294" class="arrow"/><path d="M293 322 H327" class="arrow"/>'
body += '<text x="470" y="158" class="label">第一行与第一列都只有一种走法</text><text x="470" y="203">中间格 2 = 上方 1 + 左方 1</text><text x="470" y="248">终点格 6 = 上方 3 + 左方 3</text><text x="470" y="304" class="small">先算依赖格 再算当前格</text><text x="470" y="339" class="small">两类路线按最后一步区分 不重复计数</text><text x="32" y="408" class="small">表中的数是路线数量 不是步数 不是格子代价 也不是一条实际路径</text>'
write('chapters/16-多维动态规划/assets', '0062-paths.svg', header('不同路径 从最后一步推导状态依赖', '三乘三网格的路线计数 首行首列为一 其余格等于上方与左方之和 终点为六', body))
console.log('已生成三个可编辑SVG')
