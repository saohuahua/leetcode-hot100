import test from 'node:test'
import assert from 'node:assert/strict'
import { twoSum } from '../solutions/01/0001.js'

test('两数之和覆盖官方示例与常见误区', () => {
  for (const [nums, target, expected] of [
    [[2, 7, 11, 15], 9, [0, 1]],
    [[3, 2, 4], 6, [1, 2]],
    [[3, 3], 6, [0, 1]],
    [[0, 4, 3, 0], 0, [0, 3]],
    [[-3, 4, 3, 90], 0, [0, 2]],
    [[1, 5], 6, [0, 1]],
  ] as [number[], number, number[]][]) {
    const before = [...nums]
    assert.deepEqual(twoSum(nums, target), expected)
    assert.deepEqual(nums, before)
  }
})

test('两数之和在小规模输入上与枚举对照', () => {
  for (let a = -3; a <= 3; a++) {
    for (let b = -3; b <= 3; b++) {
      for (let c = -3; c <= 3; c++) {
        const nums = [a, b, c]
        for (let target = -6; target <= 6; target++) {
          const candidates: number[][] = []
          for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
              if (nums[i] + nums[j] === target) candidates.push([i, j])
            }
          }
          if (candidates.length !== 1) continue
          assert.deepEqual(twoSum(nums, target), candidates[0])
        }
      }
    }
  }
})
import { groupAnagrams } from '../solutions/01/0049.js'
import { longestConsecutive } from '../solutions/01/0128.js'

const normalizeGroups = (groups: string[][]) => groups.map(group => [...group].sort().join('|')).sort()

test('异位词分组保留空词重复词与计数差异', () => {
  assert.deepEqual(normalizeGroups(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])), normalizeGroups([['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]))
  assert.deepEqual(groupAnagrams(['']), [['']])
  assert.deepEqual(groupAnagrams(['a']), [['a']])
  assert.deepEqual(normalizeGroups(groupAnagrams(['abb', 'aab', 'abb'])), ['aab', 'abb|abb'])
})

test('最长连续序列忽略位置与重复并支持负数', () => {
  assert.equal(longestConsecutive([100, 4, 200, 1, 3, 2]), 4)
  assert.equal(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), 9)
  assert.equal(longestConsecutive([1, 0, 1, 2]), 3)
  assert.equal(longestConsecutive([]), 0)
  assert.equal(longestConsecutive([-2, -1, -3, -1]), 3)
  assert.equal(longestConsecutive([1, 1, 1]), 1)
})
