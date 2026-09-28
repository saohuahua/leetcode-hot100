import test from 'node:test'
import assert from 'node:assert/strict'
import { TreeNode } from '../solutions/shared.js'
import { maxPathSum } from '../solutions/08/0124.js'
import { diameterOfBinaryTree } from '../solutions/08/0543.js'
import { lowestCommonAncestor } from '../solutions/08/0236.js'

function chain(size: number): TreeNode[] {
  const nodes = Array.from({ length: size }, (_, i) => new TreeNode(i))
  for (let i = 1; i < size; i++) nodes[i - 1].right = nodes[i]
  return nodes
}

test('审阅回归 0124 三万合法节点深链不依赖调用栈', () => {
  const nodes = chain(30000)
  for (const node of nodes) node.val = 1
  assert.equal(maxPathSum(nodes[0]), 30000)
  assert.equal(nodes[0].right, nodes[1])
})

test('审阅回归 0543 一万节点深链直径按边计算', () => {
  const nodes = chain(10000)
  for (const node of nodes) node.val = 1
  assert.equal(diameterOfBinaryTree(nodes[0]), 9999)
})

test('审阅回归 0236 十万节点深链与不同目标', () => {
  const nodes = chain(100000)
  assert.equal(lowestCommonAncestor(nodes[0], nodes[99998], nodes[99999]), nodes[99998])
  assert.equal(lowestCommonAncestor(nodes[0], nodes[0], nodes[99999]), nodes[0])
  assert.equal(lowestCommonAncestor(nodes[0], nodes[50], new TreeNode(-1)), null)
})
