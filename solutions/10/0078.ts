export function subsets(nums: number[]): number[][] {
  const result: number[][] = []
  const path: number[] = []
  const visit = (start: number): void => {
    // 当前路径本身就是一个合法子集
    result.push([...path])
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      // 下标递增消除同一集合的不同选择顺序
      visit(i + 1)
      path.pop()
    }
  }
  visit(0)
  return result
}
