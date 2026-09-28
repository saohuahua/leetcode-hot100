export function maxProfit(prices: number[]): number {
  if (prices.length === 0) return 0
  let lowest = prices[0]
  let best = 0
  for (let day = 1; day < prices.length; day++) {
    // 先用此前价格评价卖出 保持买入早于卖出
    best = Math.max(best, prices[day] - lowest)
    lowest = Math.min(lowest, prices[day])
  }
  return best
}
