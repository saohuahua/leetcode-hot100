import test from 'node:test'
import assert from 'node:assert/strict'
import { numIslands } from '../solutions/09/0200.js'
import { orangesRotting } from '../solutions/09/0994.js'
import { canFinish } from '../solutions/09/0207.js'
import { Trie } from '../solutions/09/0208.js'

test('0200 官方示例 连通规则与输入保持', () => {
  assert.equal(numIslands(['11110', '11010', '11000', '00000'].map(s => s.split(''))), 1)
  assert.equal(numIslands(['11000', '11000', '00100', '00011'].map(s => s.split(''))), 3)
  const grid = [['1', '0'], ['0', '1']]
  assert.equal(numIslands(grid), 2)
  assert.deepEqual(grid, [['1', '0'], ['0', '1']])
  assert.equal(numIslands([['0']]), 0)
  assert.equal(numIslands([['1']]), 1)
})

test('0200 小网格与独立集合合并模型对照', () => {
  for (let mask = 0; mask < 64; mask++) {
    const grid = Array.from({ length: 2 }, (_, r) => Array.from({ length: 3 }, (_, c) => mask & (1 << (r * 3 + c)) ? '1' : '0'))
    const groups: Set<number>[] = []
    for (let i = 0; i < 6; i++) {
      if (!(mask & (1 << i))) continue
      const connected = groups.filter(g => [...g].some(j => Math.abs(Math.floor(i / 3) - Math.floor(j / 3)) + Math.abs(i % 3 - j % 3) === 1))
      const merged = new Set([i, ...connected.flatMap(g => [...g])])
      for (const group of connected) groups.splice(groups.indexOf(group), 1)
      groups.push(merged)
    }
    assert.equal(numIslands(grid), groups.length)
  }
})

function simulateRotting(input: number[][]): number {
  let grid = input.map(row => [...row])
  for (let minute = 0; minute <= 6; minute++) {
    if (!grid.some(row => row.includes(1))) return minute
    const next = grid.map(row => [...row])
    let changed = false
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] !== 1) continue
        if ([[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].some(([nr, nc]) => grid[nr]?.[nc] === 2)) {
          next[r][c] = 2
          changed = true
        }
      }
    }
    if (!changed) return -1
    grid = next
  }
  throw new Error('模拟超出小网格传播上界')
}

test('0994 官方示例与全部两行三列网格同步模拟', () => {
  assert.equal(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]), 4)
  assert.equal(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]), -1)
  assert.equal(orangesRotting([[0, 2]]), 0)
  for (let code = 0; code < 729; code++) {
    let value = code
    const cells = Array.from({ length: 6 }, () => { const digit = value % 3; value = Math.floor(value / 3); return digit })
    const grid = [cells.slice(0, 3), cells.slice(3)]
    assert.equal(orangesRotting(grid.map(row => [...row])), simulateRotting(grid))
  }
})

test('0207 官方示例 孤立课程与环', () => {
  assert.equal(canFinish(2, [[1, 0]]), true)
  assert.equal(canFinish(2, [[1, 0], [0, 1]]), false)
  assert.equal(canFinish(3, [[1, 0], [0, 1]]), false)
  assert.equal(canFinish(1, [[0, 0]]), false)
  assert.equal(canFinish(4, []), true)
  const orders = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
  const possible = [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]
  for (let mask = 0; mask < 64; mask++) {
    const edges = possible.filter((_, i) => mask & (1 << i))
    const expected = orders.some(order => edges.every(([a, b]) => order.indexOf(b) < order.indexOf(a)))
    assert.equal(canFinish(3, edges), expected)
  }
})

test('0208 前缀与单词结束标记', () => {
  const trie = new Trie()
  assert.equal(trie.search('a'), false)
  trie.insert('apple')
  assert.equal(trie.search('apple'), true)
  assert.equal(trie.search('app'), false)
  assert.equal(trie.startsWith('app'), true)
  trie.insert('app')
  trie.insert('app')
  assert.equal(trie.search('app'), true)
  assert.equal(trie.search('apple'), true)
  assert.equal(trie.startsWith('apply'), false)
  trie.insert('apply')
  assert.equal(trie.search('apply'), true)
})
