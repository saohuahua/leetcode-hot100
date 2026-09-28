import { TreeNode } from '../shared.js'

export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const positions = new Map<number, number>()
  inorder.forEach((value, index) => positions.set(value, index))
  let nextRoot = 0
  function build(left: number, right: number): TreeNode | null {
    if (left > right) return null
    const value = preorder[nextRoot++]
    const middle = positions.get(value)!
    const node = new TreeNode(value)
    // 前序先给完左子树的根所以必须先构造左边
    node.left = build(left, middle - 1)
    node.right = build(middle + 1, right)
    return node
  }
  return build(0, inorder.length - 1)
}
