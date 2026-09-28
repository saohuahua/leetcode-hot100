import test from 'node:test'
import assert from 'node:assert/strict'
import { ListNode, RandomNode, listFrom, listValues } from '../solutions/shared.js'
import { getIntersectionNode } from '../solutions/07/0160.js'
import { reverseList } from '../solutions/07/0206.js'
import { isPalindrome } from '../solutions/07/0234.js'
import { hasCycle } from '../solutions/07/0141.js'
import { detectCycle } from '../solutions/07/0142.js'
import { mergeTwoLists } from '../solutions/07/0021.js'
import { addTwoNumbers } from '../solutions/07/0002.js'
import { removeNthFromEnd } from '../solutions/07/0019.js'
import { swapPairs } from '../solutions/07/0024.js'
import { reverseKGroup } from '../solutions/07/0025.js'
import { copyRandomList } from '../solutions/07/0138.js'
import { sortList } from '../solutions/07/0148.js'
import { mergeKLists } from '../solutions/07/0023.js'
import { LRUCache } from '../solutions/07/0146.js'

function nodes(head: ListNode | null): ListNode[] {
  const result: ListNode[] = []
  while (head !== null) {
    assert.ok(!result.includes(head), '不应产生环')
    result.push(head)
    head = head.next
  }
  return result
}

test('0160 相交使用对象身份且不修改连接', () => {
  const common = listFrom([8, 4, 5])!
  const a = new ListNode(4, new ListNode(1, common))
  const b = new ListNode(5, new ListNode(6, new ListNode(1, common)))
  const before = nodes(a).map(n => [n, n.next] as const)
  assert.equal(getIntersectionNode(a, b), common)
  for (const [node, next] of before) assert.equal(node.next, next)
  assert.equal(getIntersectionNode(listFrom([1, 8]), listFrom([2, 8])), null)
  assert.equal(getIntersectionNode(null, a), null)
  assert.equal(getIntersectionNode(common, common), common)
})

test('0206 反转原节点并正确终止', () => {
  const head = listFrom([1, 2, 3, 4, 5])
  const originals = nodes(head)
  assert.deepEqual(nodes(reverseList(head)), originals.reverse())
  assert.equal(head!.next, null)
  assert.equal(reverseList(null), null)
  const single = new ListNode(1)
  assert.equal(reverseList(single), single)
})

test('0234 成功失败均恢复原连接', () => {
  for (const [values, expected] of [
    [[1, 2, 2, 1], true], [[1, 2], false], [[1, 2, 3, 2, 1], true],
    [[1, 2, 3, 4], false], [[1], true], [[], true],
  ] as const) {
    const head = listFrom([...values])
    const before = nodes(head).map(n => [n, n.next, n.val] as const)
    assert.equal(isPalindrome(head), expected)
    for (const [node, next, val] of before) {
      assert.equal(node.next, next)
      assert.equal(node.val, val)
    }
  }
})

test('0141 与 0142 环存在与入口引用', () => {
  for (let length = 1; length <= 12; length++) {
    for (let entry = -1; entry < length; entry++) {
      const head = listFrom(Array.from({ length }, () => 1))!
      const chain = nodes(head)
      if (entry >= 0) chain.at(-1)!.next = chain[entry]
      const before = chain.map(n => n.next)
      assert.equal(hasCycle(head), entry >= 0)
      assert.equal(detectCycle(head), entry < 0 ? null : chain[entry])
      chain.forEach((node, i) => assert.equal(node.next, before[i]))
    }
  }
  assert.equal(hasCycle(null), false)
  assert.equal(detectCycle(null), null)
})

test('0021 合并样例与节点保留', () => {
  const a = listFrom([1, 2, 4])
  const b = listFrom([1, 3, 4])
  const originals = new Set([...nodes(a), ...nodes(b)])
  const result = mergeTwoLists(a, b)
  assert.deepEqual(listValues(result), [1, 1, 2, 3, 4, 4])
  assert.deepEqual(new Set(nodes(result)), originals)
  assert.equal(mergeTwoLists(null, null), null)
  assert.deepEqual(listValues(mergeTwoLists(null, listFrom([0]))), [0])
})

test('0002 数位进位与长整数输入', () => {
  const a = listFrom([2, 4, 3])
  const b = listFrom([5, 6, 4])
  assert.deepEqual(listValues(addTwoNumbers(a, b)), [7, 0, 8])
  assert.deepEqual(listValues(a), [2, 4, 3])
  assert.deepEqual(listValues(b), [5, 6, 4])
  assert.deepEqual(listValues(addTwoNumbers(listFrom([0]), listFrom([0]))), [0])
  assert.deepEqual(listValues(addTwoNumbers(listFrom(Array(30).fill(9)), listFrom([1]))), [...Array(30).fill(0), 1])
})

test('0019 删除头尾与中间', () => {
  assert.deepEqual(listValues(removeNthFromEnd(listFrom([1, 2, 3, 4, 5]), 2)), [1, 2, 3, 5])
  assert.equal(removeNthFromEnd(listFrom([1]), 1), null)
  assert.deepEqual(listValues(removeNthFromEnd(listFrom([1, 2]), 2)), [2])
  assert.deepEqual(listValues(removeNthFromEnd(listFrom([1, 2]), 1)), [1])
})

test('0024 交换的是节点对象', () => {
  const head = listFrom([1, 2, 3, 4, 5])
  const n = nodes(head)
  assert.deepEqual(nodes(swapPairs(head)), [n[1], n[0], n[3], n[2], n[4]])
  assert.equal(swapPairs(null), null)
  assert.deepEqual(listValues(swapPairs(listFrom([1]))), [1])
})

test('0025 各组反转及不足组保留', () => {
  for (let length = 1; length <= 10; length++) {
    for (let k = 1; k <= length; k++) {
      const head = listFrom(Array.from({ length }, (_, i) => i))
      const original = nodes(head)
      const expected: ListNode[] = []
      for (let start = 0; start < length; start += k) {
        const part = original.slice(start, start + k)
        expected.push(...(part.length === k ? part.reverse() : part))
      }
      assert.deepEqual(nodes(reverseKGroup(head, k)), expected)
    }
  }
})

test('0138 深拷贝随机边与重复值身份', () => {
  const a = new RandomNode(7)
  const b = new RandomNode(7)
  const c = new RandomNode(11)
  a.next = b
  b.next = c
  a.random = c
  b.random = b
  c.random = a
  const clone = copyRandomList(a)!
  const originals = [a, b, c]
  const copies = [clone, clone.next!, clone.next!.next!]
  copies.forEach((node, i) => {
    assert.ok(!originals.includes(node))
    assert.equal(node.val, originals[i].val)
    const target = originals.indexOf(originals[i].random!)
    assert.equal(node.random, copies[target])
  })
  assert.equal(copies[2].next, null)
  assert.equal(a.next, b)
  assert.equal(b.next, c)
  assert.equal(a.random, c)
  assert.equal(b.random, b)
  assert.equal(c.random, a)
  a.val = 99
  assert.equal(clone.val, 7)
  assert.equal(copyRandomList(null), null)
  const only = new RandomNode(0)
  assert.equal(copyRandomList(only)!.random, null)
})

test('0148 与数组排序对照并保留全部节点', () => {
  let seed = 42
  for (let length = 0; length <= 80; length++) {
    const values = Array.from({ length }, () => {
      seed = (seed * 1664525 + 1013904223) >>> 0
      return seed % 21 - 10
    })
    const head = listFrom(values)
    const originals = new Set(nodes(head))
    const sorted = sortList(head)
    assert.deepEqual(listValues(sorted), [...values].sort((a, b) => a - b))
    assert.deepEqual(new Set(nodes(sorted)), originals)
  }
})

test('0023 合并多个有序链与空输入', () => {
  assert.deepEqual(listValues(mergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]].map(listFrom))), [1, 1, 2, 3, 4, 4, 5, 6])
  assert.equal(mergeKLists([]), null)
  assert.equal(mergeKLists([null, null]), null)
  assert.deepEqual(listValues(mergeKLists([null, listFrom([-1, 2])])), [-1, 2])
})

test('0146 命中刷新更新与容量边界', () => {
  const cache = new LRUCache(2)
  cache.put(1, 1)
  cache.put(2, 2)
  assert.equal(cache.get(1), 1)
  cache.put(3, 3)
  assert.equal(cache.get(2), -1)
  cache.put(4, 4)
  assert.equal(cache.get(1), -1)
  assert.equal(cache.get(3), 3)
  assert.equal(cache.get(4), 4)
  cache.put(3, 30)
  cache.put(5, 5)
  assert.equal(cache.get(4), -1)
  assert.equal(cache.get(3), 30)
  const single = new LRUCache(1)
  single.put(1, 0)
  assert.equal(single.get(1), 0)
  single.put(1, 2)
  single.put(2, 3)
  assert.equal(single.get(1), -1)
  assert.equal(single.get(2), 3)
})
