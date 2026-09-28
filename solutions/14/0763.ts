export function partitionLabels(s: string): number[] {
  const last = new Map<string, number>()
  for (let i = 0; i < s.length; i++) last.set(s[i], i)
  const answer: number[] = []
  let start = 0
  let end = 0
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last.get(s[i])!)
    // 所有段内字符的最后出现都已覆盖 此刻才能切分
    if (i === end) {
      answer.push(end - start + 1)
      start = i + 1
    }
  }
  return answer
}
