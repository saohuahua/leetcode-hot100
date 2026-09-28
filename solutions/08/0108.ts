import { TreeNode } from '../shared.js'

export function sortedArrayToBST(nums: number[]): TreeNode | null {
  function build(left: number, right: number): TreeNode | null {
    if (left > right) return null
    // 中点两侧规模最多相差一个
    const middle = Math.floor((left + right) / 2)
    const node = new TreeNode(nums[middle])
    node.left = build(left, middle - 1)
    node.right = build(middle + 1, right)
    return node
  }
  return build(0, nums.length - 1)
}
