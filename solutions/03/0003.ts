export function lengthOfLongestSubstring(s: string): number {
  // 左边界只向右移动以排除当前区间内的重复字符
  let left = 0
  let best = 0
  // 记录每个字符最近出现的位置以便直接越过冲突位置
  const lastSeen = new Map<string, number>()

  for (let right = 0; right < s.length; right++) {
    const char = s[right]
    const previous = lastSeen.get(char)
    // 历史位置落在当前区间内才需要收缩
    if (previous !== undefined && previous >= left) {
      left = previous + 1
    }
    lastSeen.set(char, right)
    // 修复冲突后的区间才可以参与答案比较
    best = Math.max(best, right - left + 1)
  }

  return best
}
