import { TreeNode } from '../shared.js'

export function pathSum(root: TreeNode | null, targetSum: number): number {
  // 空前缀使从根开始的路径也能被统一统计
  const counts = new Map<number, number>([[0, 1]])
  function visit(node: TreeNode | null, prefix: number): number {
    if (node === null) return 0
    const current = prefix + node.val
    let total = counts.get(current - targetSum) ?? 0
    counts.set(current, (counts.get(current) ?? 0) + 1)
    total += visit(node.left, current)
    total += visit(node.right, current)
    // 离开当前路径时撤销记录避免污染兄弟分支
    const remaining = counts.get(current)! - 1
    if (remaining === 0) counts.delete(current)
    else counts.set(current, remaining)
    return total
  }
  return visit(root, 0)
}
