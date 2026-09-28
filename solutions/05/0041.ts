export function firstMissingPositive(nums: number[]): number {
  const n = nums.length
  for (let i = 0; i < n; i++) {
    // 只把范围内且尚未归位的正数送回对应位置
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const target = nums[i] - 1
      const temporary = nums[target]
      nums[target] = nums[i]
      nums[i] = temporary
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1
  }
  return n + 1
}
