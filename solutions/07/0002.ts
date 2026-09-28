import { ListNode } from '../shared.js'

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode()
  let tail = dummy
  let carry = 0
  // 最后一个进位也是待处理的一位
  while (l1 !== null || l2 !== null || carry !== 0) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry
    tail.next = new ListNode(sum % 10)
    tail = tail.next
    carry = Math.floor(sum / 10)
    l1 = l1?.next ?? null
    l2 = l2?.next ?? null
  }
  return dummy.next
}
