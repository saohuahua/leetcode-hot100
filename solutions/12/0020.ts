export function isValid(s: string): boolean {
  const stack: string[] = []
  const matches: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char)
    } else {
      // 最近尚未闭合的左括号必须先完成
      if (stack.pop() !== matches[char]) return false
    }
  }
  return stack.length === 0
}
