export function generateParenthesis(n: number): string[] {
  const result: string[] = []
  const path: string[] = []
  const visit = (open: number, close: number): void => {
    if (open === n && close === n) {
      result.push(path.join(''))
      return
    }
    if (open < n) {
      path.push('(')
      visit(open + 1, close)
      path.pop()
    }
    // 右括号只能关闭此前尚未匹配的左括号
    if (close < open) {
      path.push(')')
      visit(open, close + 1)
      path.pop()
    }
  }
  visit(0, 0)
  return result
}
