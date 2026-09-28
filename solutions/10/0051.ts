export function solveNQueens(n: number): string[][] {
  const result: string[][] = []
  const positions = new Array<number>(n)
  const columns = new Set<number>()
  const differences = new Set<number>()
  const sums = new Set<number>()
  const visit = (row: number): void => {
    if (row === n) {
      result.push(positions.map(col => '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1)))
      return
    }
    for (let col = 0; col < n; col++) {
      const difference = row - col
      const sum = row + col
      if (columns.has(col) || differences.has(difference) || sums.has(sum)) continue
      // 三种占用分别排除同列与两个方向的对角线
      columns.add(col)
      differences.add(difference)
      sums.add(sum)
      positions[row] = col
      visit(row + 1)
      // 撤销当前皇后使同层其他候选互不影响
      columns.delete(col)
      differences.delete(difference)
      sums.delete(sum)
    }
  }
  visit(0)
  return result
}
