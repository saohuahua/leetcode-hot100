import { TreeNode } from '../shared.js'

export function isValidBST(root: TreeNode | null): boolean {
  if (root === null) return true
  const stack: Array<[TreeNode, number, number]> = [[root, -Infinity, Infinity]]
  while (stack.length > 0) {
    const [node, lower, upper] = stack.pop()!
    // 祖先传下来的限制也必须满足
    if (node.val <= lower || node.val >= upper) return false
    if (node.left !== null) stack.push([node.left, lower, node.val])
    if (node.right !== null) stack.push([node.right, node.val, upper])
  }
  return true
}
