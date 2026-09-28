// 查找两个不同位置使对应数值之和等于目标
export function twoSum(nums: number[], target: number): number[] {
  // 记录已经经过的数值及其位置
  const seen = new Map<number, number>()
  for (let index = 0; index < nums.length; index++) {
    const value = nums[index]
    const needed = target - value
    // 先查询历史保证两个位置不同
    const previousIndex = seen.get(needed)
    // 下标零也是有效答案不能按真假判断
    if (previousIndex !== undefined) return [previousIndex, index]
    // 同值覆盖旧位置仍能保留一个可用搭档
    seen.set(value, index)
  }
  // 题目保证有解此分支服务于本地调用
  return []
}
