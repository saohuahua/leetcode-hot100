export function majorityElement(nums: number[]): number {
  let candidate = nums[0]
  let balance = 0
  for (const num of nums) {
    // 余额归零说明此前这一批已被不同值成对抵消
    if (balance === 0) candidate = num
    balance += num === candidate ? 1 : -1
  }
  return candidate
}
