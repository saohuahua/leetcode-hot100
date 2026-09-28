export function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false
  const columns = matrix[0].length
  // 线性闭区间代表按行展开后仍待检查的元素
  let left = 0
  let right = matrix.length * columns - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    // 整行数量决定行号而余数决定列号
    const value = matrix[Math.floor(mid / columns)][mid % columns]
    if (value === target) return true
    if (value < target) left = mid + 1
    else right = mid - 1
  }
  return false
}
