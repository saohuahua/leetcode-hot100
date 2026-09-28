import { ListNode } from '../shared.js'

export function sortList(head: ListNode | null): ListNode | null {
  let length = 0
  for (let node = head; node !== null; node = node.next) length++
  const dummy = new ListNode(0, head)
  function cut(start: ListNode | null, count: number): ListNode | null {
    if (start === null) return null
    for (let i = 1; i < count && start.next !== null; i++) start = start.next
    const rest = start.next
    // 断开当前段以限制合并范围
    start.next = null
    return rest
  }
  for (let width = 1; width < length; width *= 2) {
    let current = dummy.next
    let tail = dummy
    while (current !== null) {
      let left: ListNode | null = current
      let right = cut(left, width)
      current = cut(right, width)
      while (left !== null || right !== null) {
        if (right === null || (left !== null && left.val <= right.val)) {
          tail.next = left
          left = left!.next
        } else {
          tail.next = right
          right = right.next
        }
        tail = tail.next!
      }
      tail.next = current
    }
  }
  return dummy.next
}
