export function decodeString(s: string): string {
  const stack: Array<{ prefix: string; count: number }> = []
  let current = ''
  let count = 0
  for (const char of s) {
    if (char >= '0' && char <= '9') {
      count = count * 10 + Number(char)
    } else if (char === '[') {
      // 保存外层现场后才开始构建内层内容
      stack.push({ prefix: current, count })
      current = ''
      count = 0
    } else if (char === ']') {
      const frame = stack.pop()!
      current = frame.prefix + current.repeat(frame.count)
    } else {
      current += char
    }
  }
  return current
}
