export function minPathSum(grid: number[][]): number {
  const rows = grid.length
  const columns = grid[0].length
  const cost = Array.from({ length: rows }, () => new Array<number>(columns).fill(Infinity))
  cost[0][0] = grid[0][0]
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (row === 0 && col === 0) continue
      // 不存在的来源保持不可达而不是假定免费进入
      const fromTop = row > 0 ? cost[row - 1][col] : Infinity
      const fromLeft = col > 0 ? cost[row][col - 1] : Infinity
      cost[row][col] = Math.min(fromTop, fromLeft) + grid[row][col]
    }
  }
  return cost[rows - 1][columns - 1]
}
