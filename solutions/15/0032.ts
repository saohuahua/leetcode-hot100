export function longestValidParentheses(s: string): number {
  // 每项只表示强制在该位置结尾的最长合法连续段
  const length = new Array<number>(s.length).fill(0)
  let best = 0
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== ')') continue
    // 跳过紧邻的已匹配段寻找当前右括号的候选搭档
    const open = i - length[i - 1] - 1
    if (open >= 0 && s[open] === '(') {
      length[i] = length[i - 1] + 2
      // 左侧相邻合法段可以与新配好的一段连接
      if (open > 0) length[i] += length[open - 1]
      best = Math.max(best, length[i])
    }
  }
  return best
}
