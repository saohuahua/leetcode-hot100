import { ListNode } from '../shared.js'

export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode()
  let tail = dummy
  while (list1 !== null && list2 !== null) {
    // 每条链剩余部分的最小值都在头部
    if (list1.val <= list2.val) {
      tail.next = list1
      list1 = list1.next
    } else {
      tail.next = list2
      list2 = list2.next
    }
    tail = tail.next
  }
  // 未耗尽部分自身有序可以整体接入
  tail.next = list1 ?? list2
  return dummy.next
}
