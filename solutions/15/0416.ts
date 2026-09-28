export function canPartition(nums: number[]): boolean {
  const total = nums.reduce((sum, value) => sum + value, 0)
  if (total % 2 !== 0) return false
  const target = total / 2
  const reachable = new Array<boolean>(target + 1).fill(false)
  reachable[0] = true
  for (const value of nums) {
    // 倒序保证较小和仍属于尚未使用当前元素的上一轮
    for (let sum = target; sum >= value; sum--) {
      reachable[sum] = reachable[sum] || reachable[sum - value]
    }
  }
  return reachable[target]
}
