import { ListNode } from '../shared.js'

export function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head
  let fast = head
  while (fast !== null && fast.next !== null) {
    slow = slow!.next
    fast = fast.next.next
    if (slow === fast) {
      let entry = head
      // 一个从头出发一个从相遇处出发同步前进
      while (entry !== slow) {
        entry = entry!.next
        slow = slow!.next
      }
      return entry
    }
  }
  return null
}
