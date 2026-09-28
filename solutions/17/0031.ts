export function nextPermutation(nums: number[]): void {
  let pivot = nums.length - 2
  while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) pivot--
  if (pivot >= 0) {
    let successor = nums.length - 1
    while (nums[successor] <= nums[pivot]) successor--
    ;[nums[pivot], nums[successor]] = [nums[successor], nums[pivot]]
  }
  // 后缀仍然非递增 反转即可得到当前前缀下的最小排列
  let left = pivot + 1
  let right = nums.length - 1
  while (left < right) {
    ;[nums[left], nums[right]] = [nums[right], nums[left]]
    left++
    right--
  }
}
