import { ListNode } from '../shared.js'

export function reverseList(head: ListNode | null): ListNode | null {
  let previous: ListNode | null = null
  let current = head
  while (current !== null) {
    // 改向前先保存原后继以免丢失未处理部分
    const next: ListNode | null = current.next
    current.next = previous
    previous = current
    current = next
  }
  return previous
}
