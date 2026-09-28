export function findDuplicate(nums: number[]): number {
  let slow = 0
  let fast = 0
  do {
    slow = nums[slow]
    fast = nums[nums[fast]]
  } while (slow !== fast)
  // 首次相遇只证明进入同一环 重置后再定位入口
  let finder = 0
  while (finder !== slow) {
    finder = nums[finder]
    slow = nums[slow]
  }
  return finder
}
