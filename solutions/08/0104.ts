import { TreeNode } from '../shared.js'

export function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0
  let level: TreeNode[] = [root]
  let depth = 0
  while (level.length > 0) {
    const next: TreeNode[] = []
    // 本轮只收集下一层避免混入当前层计数
    for (const node of level) {
      if (node.left !== null) next.push(node.left)
      if (node.right !== null) next.push(node.right)
    }
    depth++
    level = next
  }
  return depth
}
