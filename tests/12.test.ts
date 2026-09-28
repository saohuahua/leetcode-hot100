import test from 'node:test'
import assert from 'node:assert/strict'
import { isValid } from '../solutions/12/0020.js'
import { MinStack } from '../solutions/12/0155.js'
import { decodeString } from '../solutions/12/0394.js'
import { dailyTemperatures } from '../solutions/12/0739.js'
import { largestRectangleArea } from '../solutions/12/0084.js'

test('0020 嵌套 次序与遗留左括号', () => {
  for (const s of ['()', '()[]{}', '([])', '{[()()]}']) assert.equal(isValid(s), true)
  for (const s of ['(]', '([)]', '((', ']', '())']) assert.equal(isValid(s), false)
})

test('0155 最小值恢复及重复最小值', () => {
  const stack = new MinStack()
  stack.push(-2); stack.push(0); stack.push(-3)
  assert.equal(stack.getMin(), -3)
  stack.pop()
  assert.equal(stack.top(), 0)
  assert.equal(stack.getMin(), -2)
  const model: number[] = []
  const subject = new MinStack()
  for (let i = 0; i < 80; i++) {
    const value = (i * 17) % 13 - 6
    subject.push(value); model.push(value)
    assert.equal(subject.getMin(), Math.min(...model))
  }
  while (model.length) {
    assert.equal(subject.top(), model[model.length - 1])
    assert.equal(subject.getMin(), Math.min(...model))
    model.pop(); subject.pop()
  }
})

test('0394 多位次数 嵌套与普通前后缀', () => {
  assert.equal(decodeString('3[a]2[bc]'), 'aaabcbc')
  assert.equal(decodeString('3[a2[c]]'), 'accaccacc')
  assert.equal(decodeString('2[abc]3[cd]ef'), 'abcabccdcdcdef')
  assert.equal(decodeString('12[a]'), 'a'.repeat(12))
  assert.equal(decodeString('x2[a3[b]]y'), 'xabbbabbby')
  assert.equal(decodeString('abc'), 'abc')
})

function arrays(length: number, values: number[]): number[][] {
  if (length === 0) return [[]]
  return arrays(length - 1, values).flatMap(prefix => values.map(value => [...prefix, value]))
}

test('0739 官方示例与短数组逐日扫描对照', () => {
  assert.deepEqual(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0])
  assert.deepEqual(dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0])
  assert.deepEqual(dailyTemperatures([30, 60, 90]), [1, 1, 0])
  for (let n = 1; n <= 6; n++) {
    for (const input of arrays(n, [30, 31, 32])) {
      const expected = input.map((value, i) => {
        for (let j = i + 1; j < n; j++) if (input[j] > value) return j - i
        return 0
      })
      assert.deepEqual(dailyTemperatures(input), expected)
    }
  }
})

test('0084 官方示例与全部短区间枚举对照', () => {
  assert.equal(largestRectangleArea([2, 1, 5, 6, 2, 3]), 10)
  assert.equal(largestRectangleArea([2, 4]), 4)
  for (let n = 1; n <= 7; n++) {
    for (const input of arrays(n, [0, 1, 2])) {
      let expected = 0
      for (let left = 0; left < n; left++) {
        let height = Infinity
        for (let right = left; right < n; right++) {
          height = Math.min(height, input[right])
          expected = Math.max(expected, height * (right - left + 1))
        }
      }
      assert.equal(largestRectangleArea(input), expected, input.join(','))
    }
  }
})
