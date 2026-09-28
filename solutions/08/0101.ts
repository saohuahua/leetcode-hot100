import { TreeNode } from '../shared.js'

export function isSymmetric(root: TreeNode | null): boolean {
  if (root === null) return true
  const pairs: Array<[TreeNode | null, TreeNode | null]> = [[root.left, root.right]]
  while (pairs.length > 0) {
    const [left, right] = pairs.pop()!
    if (left === null && right === null) continue
    if (left === null || right === null || left.val !== right.val) return false
    // 镜像位置是外侧一对和内侧一对
    pairs.push([left.left, right.right], [left.right, right.left])
  }
  return true
}
