import { ListNode } from '../shared.js'

export function isPalindrome(head: ListNode | null): boolean {
  if (head === null || head.next === null) return true
  let slow = head
  let fast = head
  // 快指针抵达末尾时慢指针停在前半段末尾
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next!
    fast = fast.next.next
  }
  function reverse(node: ListNode | null): ListNode | null {
    let previous: ListNode | null = null
    while (node !== null) {
      const next: ListNode | null = node.next
      node.next = previous
      previous = node
      node = next
    }
    return previous
  }
  const second = reverse(slow.next)
  let left: ListNode | null = head
  let right = second
  let result = true
  while (right !== null) {
    if (left!.val !== right.val) result = false
    left = left!.next
    right = right.next
  }
  // 即使比较失败也恢复原链表连接
  slow.next = reverse(second)
  return result
}
