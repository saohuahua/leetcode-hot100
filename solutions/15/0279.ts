export function numSquares(n: number): number {
  // 每个总和保存最少项数而零不需要任何项
  const best = new Array<number>(n + 1).fill(Infinity)
  best[0] = 0
  for (let sum = 1; sum <= n; sum++) {
    for (let root = 1; root * root <= sum; root++) {
      // 当前平方数作为最后一项连接更小总和
      best[sum] = Math.min(best[sum], best[sum - root * root] + 1)
    }
  }
  return best[n]
}
