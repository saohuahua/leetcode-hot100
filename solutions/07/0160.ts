import { ListNode } from '../shared.js'

export function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let a = headA
  let b = headB
  // 交换起点使两条路线的总长度相同
  while (a !== b) {
    a = a === null ? headB : a.next
    b = b === null ? headA : b.next
  }
  return a
}
