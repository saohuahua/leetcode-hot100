export function exist(board: string[][], word: string): boolean {
  const rows = board.length
  const columns = board[0].length
  if (word.length > rows * columns) return false
  const used = Array.from({ length: rows }, () => new Array<boolean>(columns).fill(false))
  const visit = (row: number, col: number, index: number): boolean => {
    if (row < 0 || row >= rows || col < 0 || col >= columns) return false
    if (used[row][col] || board[row][col] !== word[index]) return false
    if (index === word.length - 1) return true
    // 占用只属于当前路径而不是所有搜索共用的历史
    used[row][col] = true
    const found = visit(row + 1, col, index + 1) || visit(row - 1, col, index + 1) ||
      visit(row, col + 1, index + 1) || visit(row, col - 1, index + 1)
    // 成功短路后也恢复本层状态
    used[row][col] = false
    return found
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (visit(row, col, 0)) return true
    }
  }
  return false
}
