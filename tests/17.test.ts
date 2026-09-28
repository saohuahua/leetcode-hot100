import test from 'node:test'
import assert from 'node:assert/strict'
import { singleNumber } from '../solutions/17/0136.js'
import { majorityElement } from '../solutions/17/0169.js'
import { sortColors } from '../solutions/17/0075.js'
import { nextPermutation } from '../solutions/17/0031.js'
import { findDuplicate } from '../solutions/17/0287.js'

test('0136 官方样例与带符号成对抵消', () => {
  assert.equal(singleNumber([2, 2, 1]), 1)
  assert.equal(singleNumber([4, 1, 2, 1, 2]), 4)
  assert.equal(singleNumber([1]), 1)
  assert.equal(singleNumber([-7, 0, 8, -7, 8]), 0)
  assert.equal(singleNumber([-30000, 30000, 30000]), -30000)
})

test('0169 官方样例与所有短数组多数验证', () => {
  assert.equal(majorityElement([3, 2, 3]), 3)
  assert.equal(majorityElement([2, 2, 1, 1, 1, 2, 2]), 2)
  for (let code = 0; code < 729; code++) {
    let state = code
    const input = Array.from({ length: 6 }, () => { const value = state % 3; state = Math.floor(state / 3); return value })
    const majority = [0, 1, 2].find(value => input.filter(x => x === value).length > 3)
    if (majority !== undefined) assert.equal(majorityElement(input), majority)
  }
})

test('0075 全部短颜色数组与排序基准对照', () => {
  for (let n = 1; n <= 7; n++) {
    for (let code = 0; code < 3 ** n; code++) {
      let state = code
      const input = Array.from({ length: n }, () => { const value = state % 3; state = Math.floor(state / 3); return value })
      const expected = [...input].sort((a, b) => a - b)
      assert.equal(sortColors(input), undefined)
      assert.deepEqual(input, expected)
    }
  }
})

function permutations(input: number[]): number[][] {
  if (input.length === 0) return [[]]
  return input.flatMap((value, i) => permutations(input.filter((_, j) => j !== i)).map(rest => [value, ...rest]))
}

test('0031 全部小排列与字典序完整列表对照', () => {
  for (const values of [[1], [1, 2, 3], [1, 1, 5], [0, 0, 1, 2], [2, 2, 2]]) {
    const unique = [...new Set(permutations(values).map(p => p.join(',')))].sort().map(s => s.split(',').map(Number))
    for (let i = 0; i < unique.length; i++) {
      const input = [...unique[i]]
      assert.equal(nextPermutation(input), undefined)
      assert.deepEqual(input, unique[(i + 1) % unique.length])
    }
  }
})

test('0287 官方样例 重复多次与原数组不变', () => {
  assert.equal(findDuplicate([1, 3, 4, 2, 2]), 2)
  assert.equal(findDuplicate([3, 1, 3, 4, 2]), 3)
  assert.equal(findDuplicate([3, 3, 3, 3, 3]), 3)
  for (const values of [[1, 1], [1, 1, 2], [1, 2, 2, 3], [1, 2, 3, 4, 3]]) {
    const expected = values.find((x, i) => values.indexOf(x) !== i)!
    for (const input of permutations(values)) {
      const original = [...input]
      assert.equal(findDuplicate(input), expected)
      assert.deepEqual(input, original)
    }
  }
})
