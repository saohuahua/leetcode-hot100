export function subarraySum(nums: number[], k: number): number {
  // 空前缀使从下标零开始的区间也能被计入
  const counts = new Map<number, number>([[0, 1]])
  let prefix = 0
  let answer = 0
  for (const value of nums) {
    prefix += value
    // 先查历史以排除长度为零的区间
    answer += counts.get(prefix - k) ?? 0
    counts.set(prefix, (counts.get(prefix) ?? 0) + 1)
  }
  return answer
}
