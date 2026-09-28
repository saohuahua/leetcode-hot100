import { ListNode } from '../shared.js'

export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const dummy = new ListNode(0, head)
  let before = dummy
  while (true) {
    let kth: ListNode | null = before
    // 先探测完整一组以免修改不足长度的尾段
    for (let count = 0; count < k && kth !== null; count++) kth = kth.next
    if (kth === null) break
    const after: ListNode | null = kth.next
    const oldFirst = before.next!
    let previous: ListNode | null = after
    let current: ListNode | null = oldFirst
    while (current !== after) {
      const next: ListNode | null = current!.next
      current!.next = previous
      previous = current
      current = next
    }
    before.next = kth
    // 旧组头已经成为新组尾
    before = oldFirst
  }
  return dummy.next
}
