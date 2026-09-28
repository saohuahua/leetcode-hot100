export function spiralOrder(matrix: number[][]): number[] {
  let top = 0
  let bottom = matrix.length - 1
  let left = 0
  let right = matrix[0].length - 1
  const result: number[] = []
  while (top <= bottom && left <= right) {
    for (let col = left; col <= right; col++) result.push(matrix[top][col])
    top++
    for (let row = top; row <= bottom; row++) result.push(matrix[row][right])
    right--
    // 剩余行仍存在时才读取底边
    if (top <= bottom) {
      for (let col = right; col >= left; col--) result.push(matrix[bottom][col])
      bottom--
    }
    // 剩余列仍存在时才读取左边
    if (left <= right) {
      for (let row = bottom; row >= top; row--) result.push(matrix[row][left])
      left++
    }
  }
  return result
}
