// 优先级比较器返回真时表示左侧元素应更靠近堆顶
export class BinaryHeap<T> {
  private readonly values: T[] = []

  constructor(private readonly precedes: (a: T, b: T) => boolean) {}

  get size(): number {
    return this.values.length
  }

  peek(): T | undefined {
    return this.values[0]
  }

  push(value: T): void {
    const values = this.values
    values.push(value)
    let index = values.length - 1
    // 新元素只可能破坏它与祖先之间的顺序
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2)
      if (!this.precedes(values[index], values[parent])) break
      ;[values[index], values[parent]] = [values[parent], values[index]]
      index = parent
    }
  }

  pop(): T | undefined {
    if (this.values.length === 0) return undefined
    const first = this.values[0]
    const last = this.values.pop()!
    if (this.values.length > 0) {
      this.values[0] = last
      let index = 0
      // 选优先级更高的孩子交换以同时守住两条父子关系
      while (true) {
        const left = index * 2 + 1
        const right = left + 1
        let best = index
        if (left < this.values.length && this.precedes(this.values[left], this.values[best])) best = left
        if (right < this.values.length && this.precedes(this.values[right], this.values[best])) best = right
        if (best === index) break
        ;[this.values[index], this.values[best]] = [this.values[best], this.values[index]]
        index = best
      }
    }
    return first
  }
}
