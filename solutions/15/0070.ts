export function climbStairs(n: number): number {
  // 一阶和二阶的走法可以直接列出
  if (n <= 2) return n

  // 两个变量分别保存当前目标前两阶和前一阶的走法数
  let twoBack = 1
  let oneBack = 2

  for (let step = 3; step <= n; step++) {
    // 按最后一步的长度分成互不重叠的两类
    const current = twoBack + oneBack
    // 先保留旧的前一阶再更新当前结果
    twoBack = oneBack
    oneBack = current
  }

  return oneBack
}
