export function generate(numRows: number): number[][] {
  const result: number[][] = []
  for (let row = 0; row < numRows; row++) {
    // 每行独立创建以避免后续写入污染历史行
    const current = new Array<number>(row + 1).fill(1)
    for (let col = 1; col < row; col++) {
      // 内部位置只读取已经完成的上一行
      current[col] = result[row - 1][col - 1] + result[row - 1][col]
    }
    result.push(current)
  }
  return result
}
