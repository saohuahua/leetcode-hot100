import { TreeNode } from '../shared.js'

export function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return []
  const result: number[][] = []
  let level: TreeNode[] = [root]
  while (level.length > 0) {
    const next: TreeNode[] = []
    const values: number[] = []
    for (const node of level) {
      values.push(node.val)
      // 先左后右保证下一层的相对顺序
      if (node.left !== null) next.push(node.left)
      if (node.right !== null) next.push(node.right)
    }
    result.push(values)
    level = next
  }
  return result
}
