import test from 'node:test'
import assert from 'node:assert/strict'
import { subarraySum } from '../solutions/04/0560.js'
import { maxSlidingWindow } from '../solutions/04/0239.js'
import { minWindow } from '../solutions/04/0076.js'

test('和为K计数保留重复前缀并排除空区间', () => {
  assert.equal(subarraySum([1, 1, 1], 2), 2)
  assert.equal(subarraySum([1, 2, 3], 3), 2)
  assert.equal(subarraySum([0, 0], 0), 3)
  assert.equal(subarraySum([1, -1, 0], 0), 3)
  assert.equal(subarraySum([2], 2), 1)
  assert.equal(subarraySum([1], 0), 0)
})

test('滑动最大值处理过期相等和极端窗口长度', () => {
  assert.deepEqual(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7])
  assert.deepEqual(maxSlidingWindow([1], 1), [1])
  assert.deepEqual(maxSlidingWindow([3, 2, 1], 2), [3, 2])
  assert.deepEqual(maxSlidingWindow([2, 2, 2], 2), [2, 2])
  assert.deepEqual(maxSlidingWindow([-3, -1, -2], 3), [-1])
})

test('最小覆盖区分多余份数和缺失份数', () => {
  assert.equal(minWindow('ADOBECODEBANC', 'ABC'), 'BANC')
  assert.equal(minWindow('a', 'a'), 'a')
  assert.equal(minWindow('a', 'aa'), '')
  assert.equal(minWindow('ABAAC', 'AAC'), 'AAC')
  assert.equal(minWindow('AA', 'AB'), '')
  assert.equal(minWindow('AB', 'AAB'), '')
  assert.equal(minWindow('aA', 'A'), 'A')
})

test('前缀计数与窗口最大值对照逐区间枚举', () => {
  for (let mask = 0; mask < 243; mask++) {
    let remaining = mask
    const nums = Array.from({ length: 5 }, () => {
      const value = remaining % 3 - 1
      remaining = Math.floor(remaining / 3)
      return value
    })
    for (let target = -2; target <= 2; target++) {
      let answer = 0
      for (let left = 0; left < nums.length; left++) {
        let sum = 0
        for (let right = left; right < nums.length; right++) {
          sum += nums[right]
          if (sum === target) answer++
        }
      }
      assert.equal(subarraySum(nums, target), answer)
    }
    for (let length = 1; length <= nums.length; length++) {
      const expected = Array.from({ length: nums.length - length + 1 }, (_, left) => Math.max(...nums.slice(left, left + length)))
      assert.deepEqual(maxSlidingWindow(nums, length), expected)
    }
  }
})

test('最小覆盖短二元字符串穷举对照', () => {
  for (let length = 1; length <= 6; length++) {
    for (let mask = 0; mask < 2 ** length; mask++) {
      const s = Array.from({ length }, (_, index) => (mask >> index) & 1 ? 'A' : 'B').join('')
      for (const t of ['A', 'B', 'AA', 'AB', 'BB', 'AAB']) {
        let expected = ''
        for (let left = 0; left < s.length; left++) {
          for (let right = left; right < s.length; right++) {
            const candidate = s.slice(left, right + 1)
            if (['A', 'B'].every(char => candidate.split(char).length >= t.split(char).length)) {
              if (expected === '' || candidate.length < expected.length) expected = candidate
            }
          }
        }
        assert.equal(minWindow(s, t).length, expected.length)
        const actual = minWindow(s, t)
        if (actual !== '') assert.ok(['A', 'B'].every(char => actual.split(char).length >= t.split(char).length))
      }
    }
  }
})
