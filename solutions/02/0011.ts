export function maxArea(height: number[]): number {
  let left = 0
  let right = height.length - 1
  let best = 0
  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right])
    best = Math.max(best, area)
    // 较短边保留时缩小宽度不可能超过本次面积
    if (height[left] <= height[right]) left++
    else right--
  }
  return best
}
