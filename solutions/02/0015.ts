export function threeSum(nums: number[]): number[][] {
  // 复制后排序以保留调用者的原数组
  const sorted = [...nums].sort((a, b) => a - b)
  const result: number[][] = []
  for (let first = 0; first < sorted.length - 2; first++) {
    if (first > 0 && sorted[first] === sorted[first - 1]) continue
    if (sorted[first] > 0) break
    let left = first + 1
    let right = sorted.length - 1
    while (left < right) {
      const sum = sorted[first] + sorted[left] + sorted[right]
      if (sum < 0) left++
      else if (sum > 0) right--
      else {
        result.push([sorted[first], sorted[left], sorted[right]])
        const leftValue = sorted[left]
        const rightValue = sorted[right]
        // 相同数值只产生重复三元组
        while (left < right && sorted[left] === leftValue) left++
        while (left < right && sorted[right] === rightValue) right--
      }
    }
  }
  return result
}
