import { TreeNode } from '../shared.js'

export function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null
  const stack: TreeNode[] = [root]
  while (stack.length > 0) {
    const node = stack.pop()!
    // 交换的是子树入口而不是两个根节点的数值
    const left = node.left
    node.left = node.right
    node.right = left
    if (node.left !== null) stack.push(node.left)
    if (node.right !== null) stack.push(node.right)
  }
  return root
}
