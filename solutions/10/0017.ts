export function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return []
  const letters: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz',
  }
  const result: string[] = []
  const path: string[] = []
  const visit = (index: number): void => {
    if (index === digits.length) {
      result.push(path.join(''))
      return
    }
    // 当前层只为当前数字选择一个字母
    for (const char of letters[digits[index]]) {
      path.push(char)
      visit(index + 1)
      path.pop()
    }
  }
  visit(0)
  return result
}
