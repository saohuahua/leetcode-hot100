export function sortColors(nums: number[]): void {
  let left = 0
  let current = 0
  let right = nums.length - 1
  while (current <= right) {
    if (nums[current] === 0) {
      ;[nums[left], nums[current]] = [nums[current], nums[left]]
      left++
      current++
    } else if (nums[current] === 2) {
      ;[nums[current], nums[right]] = [nums[right], nums[current]]
      right--
      // 右端换回的仍属未知区域 必须留在当前位置检查
    } else {
      current++
    }
  }
}
