export function findAnagrams(s: string, p: string): number[] {
  const result: number[] = []
  if (p.length > s.length) return result
  const need = new Array<number>(26).fill(0)
  const window = new Array<number>(26).fill(0)
  const indexOf = (char: string) => char.charCodeAt(0) - 97
  for (const char of p) need[indexOf(char)]++
  for (let right = 0; right < s.length; right++) {
    window[indexOf(s[right])]++
    // 超出固定长度时移除刚离开左侧的字符
    if (right >= p.length) window[indexOf(s[right - p.length])]--
    if (right >= p.length - 1 && window.every((count, index) => count === need[index])) {
      result.push(right - p.length + 1)
    }
  }
  return result
}
