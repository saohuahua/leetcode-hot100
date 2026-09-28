import { TreeNode } from '../shared.js'

export function maxPathSum(root: TreeNode | null): number {
  if (root === null) return -Infinity
  let best = -Infinity
  const gains = new Map<TreeNode, number>()
  const stack: Array<[TreeNode, boolean]> = [[root, false]]
  while (stack.length > 0) {
    const [node, ready] = stack.pop()!
    if (!ready) {
      // 父节点的结算任务留到两个孩子处理完成之后
      stack.push([node, true])
      if (node.right !== null) stack.push([node.right, false])
      if (node.left !== null) stack.push([node.left, false])
      continue
    }
    // 负贡献可以不选但当前节点必须在候选中
    const left = Math.max(0, node.left === null ? 0 : gains.get(node.left)!)
    const right = Math.max(0, node.right === null ? 0 : gains.get(node.right)!)
    best = Math.max(best, node.val + left + right)
    // 表中只保存允许父节点连接的单侧贡献
    gains.set(node, node.val + Math.max(left, right))
  }
  return best
}
