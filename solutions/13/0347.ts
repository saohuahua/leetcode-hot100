export function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>()
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1)
  // 桶下标代表频次 每个不同数值只进入一个桶
  const buckets = Array.from({ length: nums.length + 1 }, () => [] as number[])
  for (const [value, count] of counts) buckets[count].push(value)
  const answer: number[] = []
  for (let frequency = nums.length; frequency >= 1; frequency--) {
    for (const value of buckets[frequency]) {
      answer.push(value)
      if (answer.length === k) return answer
    }
  }
  return answer
}
