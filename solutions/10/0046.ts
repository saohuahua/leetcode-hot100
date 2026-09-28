export function permute(nums: number[]): number[][] {
  const result: number[][] = []
  const path: number[] = []
  const used = new Array<boolean>(nums.length).fill(false)
  const visit = (): void => {
    if (path.length === nums.length) {
      // 结果保存快照避免后续撤销污染答案
      result.push([...path])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      used[i] = true
      path.push(nums[i])
      visit()
      // 恢复本层开始尝试前的两项状态
      path.pop()
      used[i] = false
    }
  }
  visit()
  return result
}
