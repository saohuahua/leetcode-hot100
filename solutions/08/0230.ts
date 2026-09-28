import { TreeNode } from '../shared.js'

export function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = []
  let current = root
  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current)
      current = current.left
    }
    const node = stack.pop()!
    // 中序访问的排名从第一小逐次增长
    k--
    if (k === 0) return node.val
    current = node.right
  }
  throw new Error('排名超出节点数量')
}
