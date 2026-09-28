import test from 'node:test'
import assert from 'node:assert/strict'
import { lengthOfLongestSubstring } from '../solutions/03/0003.js'

test('0003 官方示例与合法边界', () => {
  for (const [input, expected] of [
    ['abcabcbb', 3], ['bbbbb', 1], ['pwwkew', 3],
    ['', 0], [' ', 1], ['a', 1], ['abcdef', 6],
    ['abba', 2], ['dvdf', 3], ['a b!a', 4],
  ] as const) {
    assert.equal(lengthOfLongestSubstring(input), expected, input)
  }
})

test('0003 短字符串与独立枚举对照', () => {
  function brute(s: string): number {
    let best = 0
    for (let start = 0; start < s.length; start++) {
      const seen = new Set<string>()
      for (let end = start; end < s.length; end++) {
        if (seen.has(s[end])) break
        seen.add(s[end])
        best = Math.max(best, end - start + 1)
      }
    }
    return best
  }
  function enumerate(s: string): void {
    assert.equal(lengthOfLongestSubstring(s), brute(s), s)
    if (s.length === 7) return
    for (const char of ['a', 'b', 'c']) enumerate(s + char)
  }
  enumerate('')
})
import { findAnagrams } from '../solutions/03/0438.js'

test('异位词窗口计数与重叠匹配', () => {
  assert.deepEqual(findAnagrams('cbaebabacd', 'abc'), [0, 6])
  assert.deepEqual(findAnagrams('abab', 'ab'), [0, 1, 2])
  assert.deepEqual(findAnagrams('a', 'aa'), [])
  assert.deepEqual(findAnagrams('abb', 'aab'), [])
  assert.deepEqual(findAnagrams('aaaa', 'aa'), [0, 1, 2])
  assert.deepEqual(findAnagrams('a', 'a'), [0])
})
