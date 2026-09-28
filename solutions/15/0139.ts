export function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict)
  // 状态下标表示前缀长度而不是末字符位置
  const possible = new Array<boolean>(s.length + 1).fill(false)
  possible[0] = true
  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      // 可行前缀与一个完整单词共同组成新前缀
      if (possible[start] && words.has(s.slice(start, end))) {
        possible[end] = true
        break
      }
    }
  }
  return possible[s.length]
}
