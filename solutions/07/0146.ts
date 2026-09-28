class Entry {
  previous: Entry | null = null
  next: Entry | null = null
  constructor(public key: number, public value: number) {}
}

export class LRUCache {
  private readonly entries = new Map<number, Entry>()
  private readonly head = new Entry(0, 0)
  private readonly tail = new Entry(0, 0)

  constructor(private readonly capacity: number) {
    this.head.next = this.tail
    this.tail.previous = this.head
  }

  private detach(node: Entry): void {
    node.previous!.next = node.next
    node.next!.previous = node.previous
  }

  private moveToFront(node: Entry): void {
    const first = this.head.next!
    node.previous = this.head
    node.next = first
    first.previous = node
    this.head.next = node
  }

  get(key: number): number {
    const node = this.entries.get(key)
    if (node === undefined) return -1
    // 读取命中也会刷新最近使用顺序
    this.detach(node)
    this.moveToFront(node)
    return node.value
  }

  put(key: number, value: number): void {
    const existing = this.entries.get(key)
    if (existing !== undefined) {
      existing.value = value
      this.detach(existing)
      this.moveToFront(existing)
      return
    }
    const node = new Entry(key, value)
    this.entries.set(key, node)
    this.moveToFront(node)
    if (this.entries.size > this.capacity) {
      // 尾部前一个真实节点是最久未使用者
      const oldest = this.tail.previous!
      this.detach(oldest)
      this.entries.delete(oldest.key)
    }
  }
}
