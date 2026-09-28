export function findMin(nums: number[]): number {
  // 闭区间始终保留真正的最小值
  let left = 0
  let right = nums.length - 1
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] > nums[right]) left = mid + 1
    // 中点仍可能是最小值所以必须保留
    else right = mid
  }
  return nums[left]
}
