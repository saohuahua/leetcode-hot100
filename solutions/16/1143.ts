export function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length
  const n = text2.length
  // 零行零列表示其中一边为空前缀
  const length = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) length[i][j] = length[i - 1][j - 1] + 1
      // 末尾不同只能选择跳过一边而不能把两种方案相加
      else length[i][j] = Math.max(length[i - 1][j], length[i][j - 1])
    }
  }
  return length[m][n]
}
