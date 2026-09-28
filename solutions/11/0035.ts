export function searchInsert(nums: number[], target: number): number {
  // 左侧已确认更小而右侧已确认不小于目标
  let left = 0
  let right = nums.length
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] < target) left = mid + 1
    else right = mid
  }
  // 交界允许位于数组末尾之后
  return left
}
