export function orangesRotting(grid: number[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0
  const rows = grid.length
  const cols = grid[0].length
  const queue: number[] = []
  let fresh = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) fresh++
      else if (grid[r][c] === 2) queue.push(r * cols + c)
    }
  }
  let head = 0
  let minutes = 0
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  while (head < queue.length && fresh > 0) {
    // 固定本分钟的传播边界 新感染者留到下一分钟
    const end = queue.length
    while (head < end) {
      const current = queue[head++]
      const r = Math.floor(current / cols)
      const c = current % cols
      for (const [dr, dc] of directions) {
        const nr = r + dr
        const nc = c + dc
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== 1) continue
        // 立刻标记确保每颗新鲜橘子只计数一次
        grid[nr][nc] = 2
        fresh--
        queue.push(nr * cols + nc)
      }
    }
    minutes++
  }
  return fresh === 0 ? minutes : -1
}
