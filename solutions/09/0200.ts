export function numIslands(grid: string[][]): number {
  if (grid.length === 0 || grid[0].length === 0) return 0
  const rows = grid.length
  const cols = grid[0].length
  const visited = new Set<number>()
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
  let islands = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const start = row * cols + col
      if (grid[row][col] !== '1' || visited.has(start)) continue
      islands++
      const stack = [start]
      // 发现时即标记 防止同一陆地被重复安排
      visited.add(start)
      while (stack.length > 0) {
        const current = stack.pop()!
        const r = Math.floor(current / cols)
        const c = current % cols
        for (const [dr, dc] of directions) {
          const nr = r + dr
          const nc = c + dc
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
          const next = nr * cols + nc
          if (grid[nr][nc] !== '1' || visited.has(next)) continue
          visited.add(next)
          stack.push(next)
        }
      }
    }
  }
  return islands
}
