export function jump(nums: number[]): number {
  let jumps = 0
  let currentEnd = 0
  let nextEnd = 0
  for (let i = 0; i < nums.length - 1; i++) {
    nextEnd = Math.max(nextEnd, i + nums[i])
    // 看完这一跳能到的所有跳板后才进入下一层
    if (i === currentEnd) {
      jumps++
      currentEnd = nextEnd
    }
  }
  return jumps
}
