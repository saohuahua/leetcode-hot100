export function canJump(nums: number[]): boolean {
  let reach = 0
  for (let i = 0; i < nums.length; i++) {
    // 不可达的跳板不能贡献它的跳跃长度
    if (i > reach) return false
    reach = Math.max(reach, i + nums[i])
    if (reach >= nums.length - 1) return true
  }
  return false
}
