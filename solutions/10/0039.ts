export function combinationSum(candidates: number[], target: number): number[][] {
  const values = [...candidates].sort((a, b) => a - b)
  const result: number[][] = []
  const path: number[] = []
  const visit = (start: number, remaining: number): void => {
    if (remaining === 0) {
      result.push([...path])
      return
    }
    for (let i = start; i < values.length; i++) {
      // 后续数更大所以当前超额时整段均可排除
      if (values[i] > remaining) break
      path.push(values[i])
      // 保留当前下标以允许重复使用同一候选
      visit(i, remaining - values[i])
      path.pop()
    }
  }
  visit(0, target)
  return result
}
