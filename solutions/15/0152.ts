export function maxProduct(nums: number[]): number {
  let largest = nums[0]
  let smallest = nums[0]
  let best = nums[0]
  for (let i = 1; i < nums.length; i++) {
    const value = nums[i]
    // 两个新状态必须共同读取上一轮的极值
    const oldLargest = largest
    largest = Math.max(value, oldLargest * value, smallest * value)
    smallest = Math.min(value, oldLargest * value, smallest * value)
    best = Math.max(best, largest)
  }
  return best
}
