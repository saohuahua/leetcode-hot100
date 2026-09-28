export function searchRange(nums: number[], target: number): number[] {
  // 严格模式寻找首个更大值否则寻找首个不小于值
  const boundary = (strict: boolean): number => {
    let left = 0
    let right = nums.length
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2)
      if (nums[mid] < target || (strict && nums[mid] === target)) left = mid + 1
      else right = mid
    }
    return left
  }
  const first = boundary(false)
  // 插入位置存在不代表目标真实存在
  if (first === nums.length || nums[first] !== target) return [-1, -1]
  return [first, boundary(true) - 1]
}
