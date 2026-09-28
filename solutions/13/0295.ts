import { BinaryHeap } from './heap.js'

export class MedianFinder {
  private readonly lower = new BinaryHeap<number>((a, b) => a > b)
  private readonly upper = new BinaryHeap<number>((a, b) => a < b)

  addNum(num: number): void {
    if (this.lower.size === 0 || num <= this.lower.peek()!) this.lower.push(num)
    else this.upper.push(num)
    // 左半允许多一个元素 其余数量差通过移动边界修复
    if (this.lower.size > this.upper.size + 1) this.upper.push(this.lower.pop()!)
    if (this.upper.size > this.lower.size) this.lower.push(this.upper.pop()!)
  }

  findMedian(): number {
    if (this.lower.size > this.upper.size) return this.lower.peek()!
    return (this.lower.peek()! + this.upper.peek()!) / 2
  }
}
