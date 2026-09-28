import { ListNode } from '../shared.js'

export function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head)
  let before = dummy
  while (before.next !== null && before.next.next !== null) {
    const first = before.next
    const second = first.next!
    // 先连接组尾再将第二个节点接到组前
    first.next = second.next
    second.next = first
    before.next = second
    before = first
  }
  return dummy.next
}
