export function singleNumber(nums: number[]): number {
  let answer = 0
  // 相同值成对抵消 完整遍历后才得到唯一单值
  for (const num of nums) answer ^= num
  return answer
}
