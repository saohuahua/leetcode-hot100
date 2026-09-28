export function partition(s: string): string[][] {
  const n = s.length
  const palindrome = Array.from({ length: n }, () => new Array<boolean>(n).fill(false))
  for (let length = 1; length <= n; length++) {
    for (let left = 0; left + length <= n; left++) {
      const right = left + length - 1
      palindrome[left][right] = s[left] === s[right] &&
        (length <= 2 || palindrome[left + 1][right - 1])
    }
  }
  const result: string[][] = []
  const path: string[] = []
  const visit = (start: number): void => {
    if (start === n) {
      result.push([...path])
      return
    }
    for (let end = start; end < n; end++) {
      // 短片段失败不代表更长片段也失败
      if (!palindrome[start][end]) continue
      path.push(s.slice(start, end + 1))
      visit(end + 1)
      path.pop()
    }
  }
  visit(0)
  return result
}
