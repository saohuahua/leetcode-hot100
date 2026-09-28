// 链表节点通过引用连接后继节点
export class ListNode {
  constructor(public val = 0, public next: ListNode | null = null) {}
}

// 二叉树节点分别保存左右子树入口
export class TreeNode {
  constructor(
    public val = 0,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
  ) {}
}

// 随机指针可以指向同一链表中的任意节点
export class RandomNode {
  constructor(
    public val = 0,
    public next: RandomNode | null = null,
    public random: RandomNode | null = null,
  ) {}
}

export function listFrom(values: number[]): ListNode | null {
  const dummy = new ListNode()
  let tail = dummy
  for (const value of values) {
    tail.next = new ListNode(value)
    tail = tail.next
  }
  return dummy.next
}

export function listValues(head: ListNode | null): number[] {
  const values: number[] = []
  const visited = new Set<ListNode>()
  while (head !== null) {
    if (visited.has(head)) throw new Error('检测到意外环')
    visited.add(head)
    values.push(head.val)
    head = head.next
  }
  return values
}
