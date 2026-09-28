export function minWindow(s: string, t: string): string {
  if (t.length === 0 || t.length > s.length) return ''
  const need = new Map<string, number>()
  for (const char of t) need.set(char, (need.get(char) ?? 0) + 1)
  // 缺少的是字符总份数而不是字符种类数
  let missing = t.length
  let left = 0
  let bestStart = 0
  let bestLength = Infinity
  for (let right = 0; right < s.length; right++) {
    const char = s[right]
    const count = need.get(char)
    if (count !== undefined) {
      if (count > 0) missing--
      need.set(char, count - 1)
    }
    while (missing === 0) {
      if (right - left + 1 < bestLength) {
        bestStart = left
        bestLength = right - left + 1
      }
      const removed = s[left++]
      const remaining = need.get(removed)
      if (remaining !== undefined) {
        need.set(removed, remaining + 1)
        // 移出必需的一份才会破坏覆盖
        if (remaining + 1 > 0) missing++
      }
    }
  }
  return bestLength === Infinity ? '' : s.slice(bestStart, bestStart + bestLength)
}
