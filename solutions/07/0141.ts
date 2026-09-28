import { ListNode } from '../shared.js'

export function hasCycle(head: ListNode | null): boolean {
  let slow = head
  let fast = head
  while (fast !== null && fast.next !== null) {
    slow = slow!.next
    fast = fast.next.next
    // 移动之后比较避免把共同起点误判为环
    if (slow === fast) return true
  }
  return false
}
