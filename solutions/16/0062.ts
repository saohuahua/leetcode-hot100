export function uniquePaths(m: number, n: number): number {
  // 每行独立分配而边界路线数量均为一
  const ways = Array.from({ length: m }, () => new Array<number>(n).fill(1))
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      // 最后一步的两个来源互不重叠
      ways[row][col] = ways[row - 1][col] + ways[row][col - 1]
    }
  }
  return ways[m - 1][n - 1]
}
