import test from 'node:test'
import assert from 'node:assert/strict'
import { maxSubArray } from '../solutions/05/0053.js'
import { merge } from '../solutions/05/0056.js'
import { rotate } from '../solutions/05/0189.js'
import { productExceptSelf } from '../solutions/05/0238.js'
import { firstMissingPositive } from '../solutions/05/0041.js'

test('最大子数组和不允许空区间', () => {
  assert.equal(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6)
  assert.equal(maxSubArray([1]), 1)
  assert.equal(maxSubArray([5, 4, -1, 7, 8]), 23)
  assert.equal(maxSubArray([-3, -1]), -1)
  assert.equal(maxSubArray([2, -100, 3]), 3)
})

test('合并区间处理接触包含和乱序且不修改内层输入', () => {
  const input = [[1, 3], [2, 6], [8, 10], [15, 18]]
  const before = structuredClone(input)
  assert.deepEqual(merge(input), [[1, 6], [8, 10], [15, 18]])
  assert.deepEqual(input, before)
  assert.deepEqual(merge([[1, 4], [4, 5]]), [[1, 5]])
  assert.deepEqual(merge([[4, 7], [1, 4]]), [[1, 7]])
  assert.deepEqual(merge([[1, 10], [2, 3]]), [[1, 10]])
  assert.deepEqual(merge([[1, 1]]), [[1, 1]])
})

test('轮转原地处理取余和零步', () => {
  for (const [input, k, expected] of [
    [[1, 2, 3, 4, 5, 6, 7], 3, [5, 6, 7, 1, 2, 3, 4]],
    [[-1, -100, 3, 99], 2, [3, 99, -1, -100]],
    [[1, 2], 3, [2, 1]], [[1, 2], 0, [1, 2]], [[1], 100, [1]],
  ] as [number[], number, number[]][]) {
    rotate(input, k)
    assert.deepEqual(input, expected)
  }
})

test('除自身乘积处理零和负数', () => {
  assert.deepEqual(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6])
  // 数学零允许由浮点乘法得到负零
  assert.deepEqual(productExceptSelf([-1, 1, 0, -3, 3]).map(value => value === 0 ? 0 : value), [0, 0, 9, 0, 0])
  assert.deepEqual(productExceptSelf([0, 0]), [0, 0])
  assert.deepEqual(productExceptSelf([2, 3]), [3, 2])
})

test('缺失正数处理重复和换回值', () => {
  assert.equal(firstMissingPositive([1, 2, 0]), 3)
  assert.equal(firstMissingPositive([3, 4, -1, 1]), 2)
  assert.equal(firstMissingPositive([7, 8, 9, 11, 12]), 1)
  assert.equal(firstMissingPositive([1, 1]), 2)
  assert.equal(firstMissingPositive([-1]), 1)
  assert.equal(firstMissingPositive([1]), 2)
})

test('最大连续和与缺失正数小规模穷举对照', () => {
  for (let mask = 0; mask < 625; mask++) {
    let remaining = mask
    const nums = Array.from({ length: 4 }, () => {
      const value = remaining % 5 - 1
      remaining = Math.floor(remaining / 5)
      return value
    })
    let expectedSum = -Infinity
    for (let left = 0; left < nums.length; left++) {
      let sum = 0
      for (let right = left; right < nums.length; right++) {
        sum += nums[right]
        expectedSum = Math.max(expectedSum, sum)
      }
    }
    let expectedMissing = 1
    while (nums.includes(expectedMissing)) expectedMissing++
    assert.equal(maxSubArray(nums), expectedSum)
    assert.equal(firstMissingPositive([...nums]), expectedMissing)
  }
})
