export function lengthOfLIS(nums: number[]): number {
  // 每项必须以当前位置结尾因此单元素初始长度为一
  const length = new Array<number>(nums.length).fill(1)
  let best = 0
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) length[i] = Math.max(length[i], length[j] + 1)
    }
    // 全局答案可能在任意位置结束
    best = Math.max(best, length[i])
  }
  return best
}
