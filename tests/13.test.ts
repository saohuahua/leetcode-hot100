import test from 'node:test'
import assert from 'node:assert/strict'
import { BinaryHeap } from '../solutions/13/heap.js'
import { findKthLargest } from '../solutions/13/0215.js'
import { topKFrequent } from '../solutions/13/0347.js'
import { MedianFinder } from '../solutions/13/0295.js'

test('堆的上下浮恢复与空堆边界', () => {
  for (const sign of [1, -1]) {
    const heap = new BinaryHeap<number>((a, b) => sign * a < sign * b)
    assert.equal(heap.pop(), undefined)
    const input = Array.from({ length: 100 }, (_, i) => (i * 37) % 43 - 21)
    for (const value of input) heap.push(value)
    const expected = [...input].sort((a, b) => sign * (a - b))
    for (const value of expected) {
      assert.equal(heap.peek(), value)
      assert.equal(heap.pop(), value)
    }
    assert.equal(heap.size, 0)
    assert.equal(heap.peek(), undefined)
  }
})

test('0215 官方示例 所有排名 重复与输入不变', () => {
  assert.equal(findKthLargest([3, 2, 1, 5, 6, 4], 2), 5)
  assert.equal(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4)
  assert.equal(findKthLargest([-10000, 10000, -10000], 1), 10000)
  assert.equal(findKthLargest([-10000, 10000, -10000], 2), -10000)
  for (let n = 1; n <= 45; n++) {
    const input = Array.from({ length: n }, (_, i) => (i * 17 + n) % 19 - 9)
    const original = [...input]
    const expected = [...input].sort((a, b) => b - a)
    for (let k = 1; k <= n; k++) assert.equal(findKthLargest(input, k), expected[k - 1])
    assert.deepEqual(input, original)
  }
})

test('0347 频次优先及不同元素输出', () => {
  assert.deepEqual(topKFrequent([1, 1, 1, 2, 2, 3], 2).sort((a, b) => a - b), [1, 2])
  assert.deepEqual(topKFrequent([1], 1), [1])
  assert.deepEqual(topKFrequent([100, 1, 1], 1), [1])
  for (let unique = 1; unique <= 15; unique++) {
    const input = Array.from({ length: unique }, (_, i) => Array(i + 1).fill(i - 5) as number[]).flat()
    for (let k = 1; k <= unique; k++) {
      const expected = Array.from({ length: k }, (_, i) => unique - k + i - 5)
      assert.deepEqual(topKFrequent(input, k).sort((a, b) => a - b), expected)
    }
  }
})

test('0295 每个前缀与完整排序中位数对照', () => {
  const finder = new MedianFinder()
  finder.addNum(1); finder.addNum(2)
  assert.equal(finder.findMedian(), 1.5)
  finder.addNum(3)
  assert.equal(finder.findMedian(), 2)
  for (const input of [[-1, -2, -3, -4, -5], [2, 2, 2, 2], Array.from({ length: 101 }, (_, i) => (i * 37) % 31 - 15)]) {
    const subject = new MedianFinder()
    const model: number[] = []
    for (const value of input) {
      model.push(value)
      model.sort((a, b) => a - b)
      subject.addNum(value)
      const middle = Math.floor(model.length / 2)
      const expected = model.length % 2 ? model[middle] : (model[middle - 1] + model[middle]) / 2
      assert.equal(subject.findMedian(), expected)
    }
  }
})
