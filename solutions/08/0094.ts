import { TreeNode } from '../shared.js'

export function inorderTraversal(root: TreeNode | null): number[] {
  const values: number[] = []
  const stack: TreeNode[] = []
  let current = root
  while (current !== null || stack.length > 0) {
    // 暂存祖先以便左侧处理完后回来访问
    while (current !== null) {
      stack.push(current)
      current = current.left
    }
    const node = stack.pop()!
    values.push(node.val)
    current = node.right
  }
  return values
}
