export function rotate(matrix: number[][]): void {
  const n = matrix.length
  // 只交换主对角线一侧以免同一对交换两次
  for (let row = 0; row < n; row++) {
    for (let col = row + 1; col < n; col++) {
      const temporary = matrix[row][col]
      matrix[row][col] = matrix[col][row]
      matrix[col][row] = temporary
    }
  }
  // 转置后反转每行得到顺时针旋转
  for (const row of matrix) row.reverse()
}
