export function rob(nums: number[]): number {
  // 两个值表示前两前缀和前一前缀的最优合法收益
  let twoBack = 0
  let oneBack = 0
  for (const money of nums) {
    // 选择当前必须跳过相邻前房
    const current = Math.max(oneBack, twoBack + money)
    twoBack = oneBack
    oneBack = current
  }
  return oneBack
}
