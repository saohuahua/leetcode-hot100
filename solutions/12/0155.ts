export class MinStack {
  private readonly stack: Array<{ value: number; min: number }> = []

  push(val: number): void {
    const previous = this.stack[this.stack.length - 1]
    // 每层保留对应前缀的最小值以支持弹出后的恢复
    this.stack.push({ value: val, min: previous ? Math.min(val, previous.min) : val })
  }

  pop(): void {
    this.stack.pop()
  }

  top(): number {
    return this.stack[this.stack.length - 1].value
  }

  getMin(): number {
    return this.stack[this.stack.length - 1].min
  }
}
