export function trap(height: number[]): number {
  const n = height.length
  if (n === 0) return 0
  // 左右记录都包含当前位置
  const leftMax = new Array<number>(n)
  const rightMax = new Array<number>(n)
  leftMax[0] = height[0]
  for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i])
  rightMax[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i])
  let water = 0
  for (let i = 0; i < n; i++) {
    // 水面受两侧较低的最高挡板限制
    water += Math.min(leftMax[i], rightMax[i]) - height[i]
  }
  return water
}
