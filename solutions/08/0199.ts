import { TreeNode } from '../shared.js'

export function rightSideView(root: TreeNode | null): number[] {
  if (root === null) return []
  const result: number[] = []
  let level: TreeNode[] = [root]
  while (level.length > 0) {
    // 当前层已按从左到右排列最后一个就是可见节点
    result.push(level[level.length - 1].val)
    const next: TreeNode[] = []
    for (const node of level) {
      if (node.left !== null) next.push(node.left)
      if (node.right !== null) next.push(node.right)
    }
    level = next
  }
  return result
}
