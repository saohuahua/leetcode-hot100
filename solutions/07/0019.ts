import { ListNode } from '../shared.js'

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head)
  let fast: ListNode | null = dummy
  let slow = dummy
  // 保持快指针领先指定节点数
  for (let step = 0; step < n; step++) fast = fast!.next
  while (fast!.next !== null) {
    fast = fast!.next
    slow = slow.next!
  }
  // 慢指针停在待删节点的前驱
  slow.next = slow.next!.next
  return dummy.next
}
