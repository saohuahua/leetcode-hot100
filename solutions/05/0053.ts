export function maxSubArray(nums: number[]): number {
  // 当前值表示必须以当前位置结尾的最大连续和
  let ending = nums[0]
  let best = nums[0]
  for (let i = 1; i < nums.length; i++) {
    ending = Math.max(nums[i], ending + nums[i])
    best = Math.max(best, ending)
  }
  return best
}
