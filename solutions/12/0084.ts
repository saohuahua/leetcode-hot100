export function largestRectangleArea(heights: number[]): number {
  const stack = [-1]
  let best = 0
  for (let i = 0; i <= heights.length; i++) {
    // 末尾虚拟零用于结算仍在等待右边界的正高度
    const current = i === heights.length ? 0 : heights[i]
    while (stack.length > 1 && heights[stack[stack.length - 1]] > current) {
      const height = heights[stack.pop()!]
      const left = stack[stack.length - 1]
      best = Math.max(best, height * (i - left - 1))
    }
    if (i < heights.length) stack.push(i)
  }
  return best
}
