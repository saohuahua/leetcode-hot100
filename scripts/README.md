# 教材维护工具

题目讲解和源码是正式内容，可以直接编辑。修改实现后运行 `node scripts/sync-code.mjs` 将源码同步到正文的唯一 TS 围栏，再执行检查；修改推导不会自动改动实现，需一起审阅。

| 命令 | 用途 | 是否修改文件 |
| --- | --- | --- |
| `npm run typecheck` | 检查 TS 类型 | 不生成编译产物 |
| `npm test` | 执行全部测试 | 不改教材 |
| `npm run check:docs` | 检查100题覆盖 代码同步 提示结构 链接与注释 | 只读 |
| `node scripts/verify.mjs` | 执行以上三项并保存实际日志 | 写入 reviews 的日志与 validation.json |
| `node scripts/generate-indexes.mjs` | 从已核对题单重建目录与混合入口 | 更新索引 仅首次创建学习进度表 |
| `node scripts/sync-code.mjs` | 将题目源码同步到正文实现章节 | 更新发生变化的代码围栏 |
| `node scripts/make-diagrams.mjs` | 生成三个手写 SVG 图示 | 更新 SVG |
| `node scripts/render-diagrams.mjs` | 递归发现全部章节 SVG 并光栅化检查 | 仅写系统临时目录 |
| `node scripts/link-diagrams.mjs` | 将已生成图示接入对应正文 | 缺少图示时才插入 |

学习进度表默认不会被重建覆盖。题单快照是2026-09-28核对结果，不应把运行索引脚本理解为重新联网验证官方题单。具体来源见 [来源说明](../data/SOURCE.md)。

自动检查只能发现结构性问题，无法证明推导适合初学者，也不能替代独立 review。若增删某题主解，应复核手推、口述、复杂度、提示、反例及测试，不能只同步代码围栏。

## 图示维护

新增图示直接保存为对应章节 assets 目录中的 SVG，并由正文引用。`make-diagrams.mjs` 仅生成最初的三张图，不覆盖后续人工编写的图示；`render-diagrams.mjs` 则遍历全部章节，按章节路径生成唯一 PNG 文件名。

图示应对应一个具体的状态、依赖或结构变化，注明输入、变量含义、阅读方向与省略范围。颜色用于辅助区分，节点文字与箭头也应能独立表达关系。修改后需要实际查看渲染结果，检查中文字体、文字裁切、箭头朝向和图文一致性。
