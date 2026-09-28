export function longestConsecutive(nums: number[]): number {
  const values = new Set(nums)
  let best = 0
  for (const value of values) {
    // 有前驱的数字留给序列起点统一处理
    if (values.has(value - 1)) continue
    let current = value
    while (values.has(current + 1)) current++
    best = Math.max(best, current - value + 1)
  }
  return best
}
