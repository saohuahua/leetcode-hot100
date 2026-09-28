export function longestPalindrome(s: string): string {
  const n = s.length
  const palindrome = Array.from({ length: n }, () => new Array<boolean>(n).fill(false))
  let bestStart = 0
  let bestLength = 0
  // 内部区间更短所以按长度递增求解
  for (let length = 1; length <= n; length++) {
    for (let left = 0; left + length <= n; left++) {
      const right = left + length - 1
      palindrome[left][right] = s[left] === s[right] &&
        (length <= 2 || palindrome[left + 1][right - 1])
      if (palindrome[left][right] && length > bestLength) {
        bestStart = left
        bestLength = length
      }
    }
  }
  return s.slice(bestStart, bestStart + bestLength)
}
