import { RandomNode } from '../shared.js'

export function copyRandomList(head: RandomNode | null): RandomNode | null {
  const copies = new Map<RandomNode, RandomNode>()
  // 先建立每个原对象到新对象的身份对应
  for (let node = head; node !== null; node = node.next) {
    copies.set(node, new RandomNode(node.val))
  }
  for (let node = head; node !== null; node = node.next) {
    const copy = copies.get(node)!
    // 两种边都必须指向新对象而不是原对象
    copy.next = node.next === null ? null : copies.get(node.next)!
    copy.random = node.random === null ? null : copies.get(node.random)!
  }
  return head === null ? null : copies.get(head)!
}
