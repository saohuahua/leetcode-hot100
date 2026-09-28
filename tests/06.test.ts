import test from 'node:test'
import assert from 'node:assert/strict'
import { setZeroes } from '../solutions/06/0073.js'
import { spiralOrder } from '../solutions/06/0054.js'
import { rotate } from '../solutions/06/0048.js'
import { searchMatrix } from '../solutions/06/0240.js'

test('矩阵置零基于原始事实且区分首行首列', () => {
  for (const [input, expected] of [
    [[[1, 1, 1], [1, 0, 1], [1, 1, 1]], [[1, 0, 1], [0, 0, 0], [1, 0, 1]]],
    [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]], [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]],
    [[[1, 0], [1, 1]], [[0, 0], [1, 0]]],
    [[[1], [0]], [[0], [0]]], [[[1, 0, 2]], [[0, 0, 0]]], [[[1]], [[1]]],
  ]) {
    setZeroes(input)
    assert.deepEqual(input, expected)
  }
})

test('螺旋处理方阵长方形单行单列', () => {
  assert.deepEqual(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5])
  assert.deepEqual(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]), [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7])
  assert.deepEqual(spiralOrder([[1, 2, 3]]), [1, 2, 3])
  assert.deepEqual(spiralOrder([[1], [2], [3]]), [1, 2, 3])
  assert.deepEqual(spiralOrder([[7]]), [7])
})

test('旋转图像方向正确且四次恢复', () => {
  const example = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  rotate(example)
  assert.deepEqual(example, [[7, 4, 1], [8, 5, 2], [9, 6, 3]])
  const large = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]
  rotate(large)
  assert.deepEqual(large, [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]])
  for (let size = 1; size <= 6; size++) {
    const matrix = Array.from({ length: size }, (_, row) => Array.from({ length: size }, (_, col) => row * size + col))
    const before = structuredClone(matrix)
    for (let turn = 0; turn < 4; turn++) rotate(matrix)
    assert.deepEqual(matrix, before)
  }
})

test('搜索矩阵不假设按行展开全局有序', () => {
  const matrix = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
  assert.equal(searchMatrix(matrix, 5), true)
  assert.equal(searchMatrix(matrix, 20), false)
  assert.equal(searchMatrix([[1, 4], [2, 5]], 2), true)
  assert.equal(searchMatrix([[1]], 0), false)
  assert.equal(searchMatrix([[1, 2, 3]], 3), true)
  assert.equal(searchMatrix([[1], [2], [3]], 2), true)
})

test('矩阵置零所有小型零分布对照独立副本', () => {
  for (let mask = 0; mask < 64; mask++) {
    const input = Array.from({ length: 2 }, (_, row) => Array.from({ length: 3 }, (_, col) => (mask >> (row * 3 + col)) & 1))
    const before = structuredClone(input)
    const expected = before.map((line, row) => line.map((value, col) => before[row].includes(0) || before.some(other => other[col] === 0) ? 0 : value))
    setZeroes(input)
    assert.deepEqual(input, expected)
  }
})
