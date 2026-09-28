export function setZeroes(matrix: number[][]): void {
  const rows = matrix.length
  const cols = matrix[0].length
  let firstRowZero = false
  let firstColZero = false
  for (let col = 0; col < cols; col++) if (matrix[0][col] === 0) firstRowZero = true
  for (let row = 0; row < rows; row++) if (matrix[row][0] === 0) firstColZero = true
  // 用首行首列记录内部原始零的影响范围
  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0
        matrix[0][col] = 0
      }
    }
  }
  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) matrix[row][col] = 0
    }
  }
  // 标记使用结束后再处理首行首列自身
  if (firstRowZero) matrix[0].fill(0)
  if (firstColZero) for (let row = 0; row < rows; row++) matrix[row][0] = 0
}
