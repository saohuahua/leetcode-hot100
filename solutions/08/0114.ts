import { TreeNode } from '../shared.js'

export function flatten(root: TreeNode | null): void {
  if (root === null) return
  const stack: TreeNode[] = [root]
  let previous: TreeNode | null = null
  while (stack.length > 0) {
    const node = stack.pop()!
    // 先保存孩子再改边并让左孩子先出栈
    if (node.right !== null) stack.push(node.right)
    if (node.left !== null) stack.push(node.left)
    if (previous !== null) {
      previous.left = null
      previous.right = node
    }
    previous = node
  }
  // 最后节点成为链尾所有后继均为空
  previous!.left = null
  previous!.right = null
}
