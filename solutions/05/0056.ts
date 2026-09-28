export function merge(intervals: number[][]): number[][] {
  // 复制区间以避免排序和扩展影响输入
  const sorted = intervals.map(interval => [...interval]).sort((a, b) => a[0] - b[0])
  const result: number[][] = []
  for (const interval of sorted) {
    const last = result[result.length - 1]
    if (last === undefined || interval[0] > last[1]) result.push(interval)
    // 起点排序只保证左边有序右边仍需取最大值
    else last[1] = Math.max(last[1], interval[1])
  }
  return result
}
