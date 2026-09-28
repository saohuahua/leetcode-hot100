export function rotate(nums: number[], k: number): void {
  if (nums.length === 0) return
  const steps = k % nums.length
  const reverse = (left: number, right: number): void => {
    while (left < right) {
      const temporary = nums[left]
      nums[left++] = nums[right]
      nums[right--] = temporary
    }
  }
  // 整体反转交换两段位置再分别恢复段内顺序
  reverse(0, nums.length - 1)
  reverse(0, steps - 1)
  reverse(steps, nums.length - 1)
}
