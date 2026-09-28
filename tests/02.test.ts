import test from 'node:test'
import assert from 'node:assert/strict'
import { moveZeroes } from '../solutions/02/0283.js'
import { maxArea } from '../solutions/02/0011.js'
import { threeSum } from '../solutions/02/0015.js'
import { trap } from '../solutions/02/0042.js'

const normalizeTriples = (triples: number[][]) => triples.map(triple => [...triple].sort((a, b) => a - b).join(',')).sort()

test('移动零原地保持非零顺序', () => {
  for (const [input, expected] of [
    [[0, 1, 0, 3, 12], [1, 3, 12, 0, 0]], [[0], [0]], [[1], [1]],
    [[0, 0, 0], [0, 0, 0]], [[1, 2, 3], [1, 2, 3]], [[0, -2, 0, 3], [-2, 3, 0, 0]],
  ]) {
    moveZeroes(input)
    assert.deepEqual(input, expected)
  }
})

test('盛水容器样例与短边移动反例', () => {
  assert.equal(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49)
  assert.equal(maxArea([1, 1]), 1)
  assert.equal(maxArea([1, 2, 4, 3]), 4)
  assert.equal(maxArea([0, 0]), 0)
})

test('三数之和去重且保留输入', () => {
  const input = [-1, 0, 1, 2, -1, -4]
  const before = [...input]
  assert.deepEqual(normalizeTriples(threeSum(input)), normalizeTriples([[-1, -1, 2], [-1, 0, 1]]))
  assert.deepEqual(input, before)
  assert.deepEqual(threeSum([0, 1, 1]), [])
  assert.deepEqual(threeSum([0, 0, 0]), [[0, 0, 0]])
  assert.deepEqual(threeSum([0, 0, 0, 0]), [[0, 0, 0]])
  assert.deepEqual(threeSum([-1, -1, 2]), [[-1, -1, 2]])
})

test('接雨水样例与边界', () => {
  assert.equal(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6)
  assert.equal(trap([4, 2, 0, 3, 2, 5]), 9)
  assert.equal(trap([3, 0, 2, 0, 4]), 7)
  assert.equal(trap([3, 0, 0, 3]), 6)
  assert.equal(trap([1, 2, 3]), 0)
  assert.equal(trap([3, 2, 1]), 0)
  assert.equal(trap([0]), 0)
})

test('容器与三数之和小规模枚举对照', () => {
  for (let mask = 0; mask < 625; mask++) {
    let remaining = mask
    const nums = Array.from({ length: 4 }, () => {
      const value = remaining % 5 - 2
      remaining = Math.floor(remaining / 5)
      return value
    })
    const heights = nums.map(value => value + 2)
    let area = 0
    const triples = new Set<string>()
    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) {
        area = Math.max(area, (j - i) * Math.min(heights[i], heights[j]))
        for (let k = j + 1; k < 4; k++) {
          if (nums[i] + nums[j] + nums[k] === 0) triples.add([nums[i], nums[j], nums[k]].sort((a, b) => a - b).join(','))
        }
      }
    }
    assert.equal(maxArea(heights), area)
    assert.deepEqual(normalizeTriples(threeSum(nums)), [...triples].sort())
  }
})
