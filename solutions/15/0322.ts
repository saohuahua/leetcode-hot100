export function coinChange(coins: number[], amount: number): number {
  // 正无穷表示当前还没有合法组合
  const best = new Array<number>(amount + 1).fill(Infinity)
  best[0] = 0
  for (let value = 1; value <= amount; value++) {
    for (const coin of coins) {
      if (coin <= value) best[value] = Math.min(best[value], best[value - coin] + 1)
    }
  }
  // 计算完成后才把不可达状态转换成接口约定
  return best[amount] === Infinity ? -1 : best[amount]
}
