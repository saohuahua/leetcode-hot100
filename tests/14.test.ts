import test from 'node:test'
import assert from 'node:assert/strict'
import { maxProfit } from '../solutions/14/0121.js'
import { canJump } from '../solutions/14/0055.js'
import { jump } from '../solutions/14/0045.js'
import { partitionLabels } from '../solutions/14/0763.js'

test('0121 样例 下跌与所有买卖日期对照', () => {
  assert.equal(maxProfit([7, 1, 5, 3, 6, 4]), 5)
  assert.equal(maxProfit([7, 6, 4, 3, 1]), 0)
  assert.equal(maxProfit([5]), 0)
  for (let code = 0; code < 1024; code++) {
    let state = code
    const input = Array.from({ length: 5 }, () => { const value = state % 4; state = Math.floor(state / 4); return value })
    let expected = 0
    for (let buy = 0; buy < input.length; buy++) for (let sell = buy + 1; sell < input.length; sell++) expected = Math.max(expected, input[sell] - input[buy])
    assert.equal(maxProfit(input), expected)
  }
})

test('0055与0045 样例及短数组可达距离对照', () => {
  assert.equal(canJump([2, 3, 1, 1, 4]), true)
  assert.equal(canJump([3, 2, 1, 0, 4]), false)
  assert.equal(jump([2, 3, 1, 1, 4]), 2)
  assert.equal(jump([2, 3, 0, 1, 4]), 2)
  for (let n = 1; n <= 6; n++) {
    for (let code = 0; code < 3 ** n; code++) {
      let state = code
      const nums = Array.from({ length: n }, () => { const value = state % 3; state = Math.floor(state / 3); return value })
      const distance = Array<number>(n).fill(Infinity)
      distance[0] = 0
      for (let i = 0; i < n; i++) for (let j = i + 1; j <= Math.min(n - 1, i + nums[i]); j++) distance[j] = Math.min(distance[j], distance[i] + 1)
      const reachable = Number.isFinite(distance[n - 1])
      assert.equal(canJump(nums), reachable)
      if (reachable) assert.equal(jump(nums), distance[n - 1])
    }
  }
})

test('0763 样例及短字符串所有切分对照', () => {
  assert.deepEqual(partitionLabels('ababcbacadefegdehijhklij'), [9, 7, 8])
  assert.deepEqual(partitionLabels('eccbbbbdec'), [10])
  for (let code = 0; code < 729; code++) {
    let state = code
    const s = Array.from({ length: 6 }, () => { const value = 'abc'[state % 3]; state = Math.floor(state / 3); return value }).join('')
    let best: number[] = []
    for (let cuts = 0; cuts < 32; cuts++) {
      const owner = new Map<string, number>()
      const lengths: number[] = [0]
      let valid = true
      for (let i = 0; i < s.length; i++) {
        const section = lengths.length - 1
        if (owner.has(s[i]) && owner.get(s[i]) !== section) valid = false
        owner.set(s[i], section)
        lengths[section]++
        if (i < s.length - 1 && (cuts & (1 << i))) lengths.push(0)
      }
      if (valid && lengths.length > best.length) best = lengths
    }
    assert.deepEqual(partitionLabels(s), best)
  }
})
