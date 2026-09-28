export function minDistance(word1: string, word2: string): number {
  const m = word1.length
  const n = word2.length
  const cost = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0))
  // 空串边界分别对应连续删除与连续插入
  for (let i = 0; i <= m; i++) cost[i][0] = i
  for (let j = 0; j <= n; j++) cost[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) cost[i][j] = cost[i - 1][j - 1]
      else {
        // 三个候选分别删除原末尾插入目标末尾或替换末尾
        cost[i][j] = 1 + Math.min(cost[i - 1][j], cost[i][j - 1], cost[i - 1][j - 1])
      }
    }
  }
  return cost[m][n]
}
