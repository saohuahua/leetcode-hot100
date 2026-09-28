import { ListNode } from '../shared.js'

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null
  function merge(a: ListNode | null, b: ListNode | null): ListNode | null {
    const dummy = new ListNode()
    let tail = dummy
    while (a !== null && b !== null) {
      if (a.val <= b.val) {
        tail.next = a
        a = a.next
      } else {
        tail.next = b
        b = b.next
      }
      tail = tail.next
    }
    tail.next = a ?? b
    return dummy.next
  }
  function combine(left: number, right: number): ListNode | null {
    if (left === right) return lists[left]
    const middle = Math.floor((left + right) / 2)
    // 两边各自合并完成后再进行一次两路合并
    return merge(combine(left, middle), combine(middle + 1, right))
  }
  return combine(0, lists.length - 1)
}
