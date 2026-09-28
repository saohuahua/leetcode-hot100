import { TreeNode } from '../shared.js'

export function diameterOfBinaryTree(root: TreeNode | null): number {
  if (root === null) return 0
  let best = 0
  const heights = new Map<TreeNode, number>()
  const stack: Array<[TreeNode, boolean]> = [[root, false]]
  while (stack.length > 0) {
    const [node, ready] = stack.pop()!
    if (!ready) {
      // 当前结算压在孩子任务下面以形成左后右后根的顺序
      stack.push([node, true])
      if (node.right !== null) stack.push([node.right, false])
      if (node.left !== null) stack.push([node.left, false])
      continue
    }
    const left = node.left === null ? 0 : heights.get(node.left)!
    const right = node.right === null ? 0 : heights.get(node.right)!
    // 两条向下分支在当前节点连接成为完整路径
    best = Math.max(best, left + right)
    // 父节点只能连接当前节点的一条较深分支
    heights.set(node, Math.max(left, right) + 1)
  }
  return best
}
