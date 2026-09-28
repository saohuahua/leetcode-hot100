import test from 'node:test'
import assert from 'node:assert/strict'
import { TreeNode } from '../solutions/shared.js'
import { inorderTraversal } from '../solutions/08/0094.js'
import { maxDepth } from '../solutions/08/0104.js'
import { invertTree } from '../solutions/08/0226.js'
import { isSymmetric } from '../solutions/08/0101.js'
import { diameterOfBinaryTree } from '../solutions/08/0543.js'
import { levelOrder } from '../solutions/08/0102.js'
import { sortedArrayToBST } from '../solutions/08/0108.js'
import { isValidBST } from '../solutions/08/0098.js'
import { kthSmallest } from '../solutions/08/0230.js'
import { rightSideView } from '../solutions/08/0199.js'
import { flatten } from '../solutions/08/0114.js'
import { buildTree } from '../solutions/08/0105.js'
import { pathSum } from '../solutions/08/0437.js'
import { lowestCommonAncestor } from '../solutions/08/0236.js'
import { maxPathSum } from '../solutions/08/0124.js'

function tree(values: Array<number | null>): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null
  const root = new TreeNode(values[0])
  const queue = [root]
  let next = 1
  for (let i = 0; i < queue.length && next < values.length; i++) {
    const node = queue[i]
    const left = values[next++]
    if (left !== null && left !== undefined) {
      node.left = new TreeNode(left)
      queue.push(node.left)
    }
    const right = values[next++]
    if (right !== null && right !== undefined) {
      node.right = new TreeNode(right)
      queue.push(node.right)
    }
  }
  return root
}

function preorder(root: TreeNode | null): TreeNode[] {
  if (root === null) return []
  return [root, ...preorder(root.left), ...preorder(root.right)]
}

test('0094 中序顺序与空树', () => {
  assert.deepEqual(inorderTraversal(tree([1, null, 2, 3])), [1, 3, 2])
  assert.deepEqual(inorderTraversal(null), [])
  assert.deepEqual(inorderTraversal(tree([9, 5, 1])), [5, 9, 1])
})

test('0104 最大深度不是最早叶子', () => {
  assert.equal(maxDepth(tree([3, 9, 20, null, null, 15, 7])), 3)
  assert.equal(maxDepth(null), 0)
  assert.equal(maxDepth(tree([1])), 1)
  assert.equal(maxDepth(tree([1, 2, 3, null, null, null, 4])), 3)
})

test('0226 翻转两次恢复每个节点原连接', () => {
  const root = tree([4, 2, 7, 1, 3, 6, 9])!
  const snapshot = preorder(root).map(n => [n, n.left, n.right] as const)
  assert.equal(invertTree(root), root)
  assert.deepEqual(levelOrder(root), [[4], [7, 2], [9, 6, 3, 1]])
  invertTree(root)
  for (const [node, left, right] of snapshot) {
    assert.equal(node.left, left)
    assert.equal(node.right, right)
  }
  assert.equal(invertTree(null), null)
})

test('0101 对称包含空位置', () => {
  assert.equal(isSymmetric(tree([1, 2, 2, 3, 4, 4, 3])), true)
  assert.equal(isSymmetric(tree([1, 2, 2, null, 3, null, 3])), false)
  assert.equal(isSymmetric(tree([1])), true)
  assert.equal(isSymmetric(null), true)
})

test('0543 直径按边且可不经过根', () => {
  assert.equal(diameterOfBinaryTree(tree([1, 2, 3, 4, 5])), 3)
  assert.equal(diameterOfBinaryTree(tree([1])), 0)
  assert.equal(diameterOfBinaryTree(null), 0)
  const center = new TreeNode(2, new TreeNode(3, new TreeNode(4)), new TreeNode(5, null, new TreeNode(6)))
  assert.equal(diameterOfBinaryTree(new TreeNode(1, center)), 4)
})

test('0102 按层从左到右输出', () => {
  assert.deepEqual(levelOrder(tree([3, 9, 20, null, null, 15, 7])), [[3], [9, 20], [15, 7]])
  assert.deepEqual(levelOrder(null), [])
  assert.deepEqual(levelOrder(tree([1, null, 2, null, 3])), [[1], [2], [3]])
})

test('0108 验证排序与每处平衡而非固定树形', () => {
  function balanced(node: TreeNode | null): number {
    if (node === null) return 0
    const left = balanced(node.left)
    const right = balanced(node.right)
    assert.ok(Math.abs(left - right) <= 1)
    return Math.max(left, right) + 1
  }
  for (let length = 0; length <= 80; length++) {
    const values = Array.from({ length }, (_, i) => i * 2 - 80)
    const result = sortedArrayToBST(values)
    assert.deepEqual(inorderTraversal(result), values)
    assert.equal(isValidBST(result), true)
    balanced(result)
  }
})

test('0098 继承祖先限制及严格不等', () => {
  assert.equal(isValidBST(tree([2, 1, 3])), true)
  assert.equal(isValidBST(tree([5, 1, 4, null, null, 3, 6])), false)
  assert.equal(isValidBST(tree([5, null, 7, 4])), false)
  assert.equal(isValidBST(tree([2, 2, 3])), false)
  assert.equal(isValidBST(tree([2147483647])), true)
  assert.equal(isValidBST(null), true)
})

test('0230 中序排名从一开始', () => {
  const root = tree([3, 1, 4, null, 2])
  for (let k = 1; k <= 4; k++) assert.equal(kthSmallest(root, k), k)
  assert.equal(kthSmallest(tree([1]), 1), 1)
})

test('0199 左子树深层也可能可见', () => {
  assert.deepEqual(rightSideView(tree([1, 2, 3, null, 5, null, 4])), [1, 3, 4])
  assert.deepEqual(rightSideView(tree([1, 2, null, 3])), [1, 2, 3])
  assert.deepEqual(rightSideView(null), [])
})

test('0114 原地按前序重连且所有左边为空', () => {
  for (const values of [[1, 2, 5, 3, 4, null, 6], [], [0], [1, null, 2]] as Array<Array<number | null>>) {
    const root = tree(values)
    const expected = preorder(root)
    flatten(root)
    const actual: TreeNode[] = []
    for (let node = root; node !== null; node = node.right) {
      assert.equal(node.left, null)
      assert.ok(!actual.includes(node), '展开不应产生环')
      actual.push(node)
    }
    assert.deepEqual(actual, expected)
  }
})

test('0105 重建后的两个遍历应还原输入', () => {
  for (const [pre, ino] of [
    [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]],
    [[-1], [-1]], [[1, 2, 3], [3, 2, 1]], [[], []],
  ]) {
    const result = buildTree(pre, ino)
    assert.deepEqual(preorder(result).map(n => n.val), pre)
    assert.deepEqual(inorderTraversal(result), ino)
  }
})

test('0437 前缀次数与兄弟分支撤销', () => {
  assert.equal(pathSum(tree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]), 8), 3)
  assert.equal(pathSum(tree([1, 1, 1]), 0), 0)
  assert.equal(pathSum(tree([0, 0, null, 0]), 0), 6)
  assert.equal(pathSum(tree([1, -1, null, 1]), 1), 3)
  assert.equal(pathSum(null, 0), 0)
  function from(node: TreeNode | null, target: number): number {
    if (node === null) return 0
    return Number(node.val === target) + from(node.left, target - node.val) + from(node.right, target - node.val)
  }
  function brute(node: TreeNode | null, target: number): number {
    return node === null ? 0 : from(node, target) + brute(node.left, target) + brute(node.right, target)
  }
  for (let mask = 0; mask < 128; mask++) {
    const root = tree(Array.from({ length: 7 }, (_, i) => ((mask >> i) & 1) === 0 ? -1 : 1))
    for (let target = -3; target <= 3; target++) assert.equal(pathSum(root, target), brute(root, target))
  }
})

test('0236 最近祖先按引用且自身也可为祖先', () => {
  const root = tree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4])!
  assert.equal(lowestCommonAncestor(root, root.left!, root.right!), root)
  assert.equal(lowestCommonAncestor(root, root.left!, root.left!.right!.right!), root.left)
  assert.equal(lowestCommonAncestor(root, root.left!.left!, root.left!.right!), root.left)
})

test('0124 负数与不经过根的最大路径', () => {
  assert.equal(maxPathSum(tree([1, 2, 3])), 6)
  assert.equal(maxPathSum(tree([-10, 9, 20, null, null, 15, 7])), 42)
  assert.equal(maxPathSum(tree([-3])), -3)
  assert.equal(maxPathSum(tree([-2, -1, -3])), -1)
  function brute(root: TreeNode): number {
    const nodes = preorder(root)
    const adjacency = new Map<TreeNode, TreeNode[]>()
    for (const node of nodes) adjacency.set(node, [])
    for (const node of nodes) {
      for (const child of [node.left, node.right]) {
        if (child !== null) {
          adjacency.get(node)!.push(child)
          adjacency.get(child)!.push(node)
        }
      }
    }
    let best = -Infinity
    function visit(node: TreeNode, previous: TreeNode | null, sum: number): void {
      const current = sum + node.val
      best = Math.max(best, current)
      for (const next of adjacency.get(node)!) if (next !== previous) visit(next, node, current)
    }
    for (const node of nodes) visit(node, null, 0)
    return best
  }
  for (let mask = 0; mask < 128; mask++) {
    const root = tree(Array.from({ length: 7 }, (_, i) => ((mask >> i) & 1) === 0 ? -2 : 3))!
    assert.equal(maxPathSum(root), brute(root))
  }
})
