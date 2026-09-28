export function findKthLargest(nums: number[], k: number): number {
  const minimum = -10000
  const maximum = 10000
  const counts = Array<number>(maximum - minimum + 1).fill(0)
  // 平移下标使负数也能进入计数表 重复值保留全部次数
  for (const num of nums) counts[num - minimum]++
  let rank = k
  for (let index = counts.length - 1; index >= 0; index--) {
    rank -= counts[index]
    if (rank <= 0) return index + minimum
  }
  throw new Error('输入不符合题目的取值或排名约束')
}
