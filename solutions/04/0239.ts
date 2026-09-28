export function maxSlidingWindow(nums: number[], k: number): number[] {
  // 队列存下标以同时判断大小和是否过期
  const deque: number[] = []
  let head = 0
  const result: number[] = []
  for (let right = 0; right < nums.length; right++) {
    if (head < deque.length && deque[head] <= right - k) head++
    // 更晚且不小的元素能完全替代尾部候选
    while (head < deque.length && nums[deque[deque.length - 1]] <= nums[right]) deque.pop()
    deque.push(right)
    if (right >= k - 1) result.push(nums[deque[head]])
  }
  return result
}
