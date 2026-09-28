export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 只交换引用以保证搜索短数组的全部切口都合法
  let a = nums1
  let b = nums2
  if (a.length > b.length) [a, b] = [b, a]
  const half = Math.floor((a.length + b.length + 1) / 2)
  let left = 0
  let right = a.length
  while (left <= right) {
    const i = left + Math.floor((right - left) / 2)
    const j = half - i
    // 空半区通过无穷哨兵参与统一比较
    const aLeft = i === 0 ? -Infinity : a[i - 1]
    const aRight = i === a.length ? Infinity : a[i]
    const bLeft = j === 0 ? -Infinity : b[j - 1]
    const bRight = j === b.length ? Infinity : b[j]
    if (aLeft > bRight) right = i - 1
    else if (bLeft > aRight) left = i + 1
    else {
      const lower = Math.max(aLeft, bLeft)
      if ((a.length + b.length) % 2 === 1) return lower
      return (lower + Math.min(aRight, bRight)) / 2
    }
  }
  throw new Error('输入必须为有序数组且总长度非零')
}
