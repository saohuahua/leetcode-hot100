import test from 'node:test'
import assert from 'node:assert/strict'
import { searchInsert } from '../solutions/11/0035.js'
import { searchRange } from '../solutions/11/0034.js'
import { maxProduct } from '../solutions/15/0152.js'
import { canPartition } from '../solutions/15/0416.js'
import { rob } from '../solutions/15/0198.js'
import { lengthOfLIS } from '../solutions/15/0300.js'
import { coinChange } from '../solutions/15/0322.js'
import { wordBreak } from '../solutions/15/0139.js'

test('独立复核边界查找与线性位置对照', () => {
  for (let mask = 0; mask < 256; mask++) {
    let rest = mask
    const nums = Array.from({ length: 4 }, () => {
      const value = rest % 4 - 1
      rest = Math.floor(rest / 4)
      return value
    }).sort((a, b) => a - b)
    for (let target = -2; target <= 3; target++) {
      const first = nums.indexOf(target)
      assert.deepEqual(searchRange(nums, target), first === -1 ? [-1, -1] : [first, nums.lastIndexOf(target)])
      const unique = [...new Set(nums)]
      const insert = unique.findIndex(value => value >= target)
      assert.equal(searchInsert(unique, target), insert === -1 ? unique.length : insert)
    }
  }
})

test('独立复核乘积极值与所有连续区间对照', () => {
  for (let mask = 0; mask < 3125; mask++) {
    let rest = mask
    const nums = Array.from({ length: 5 }, () => {
      const value = rest % 5 - 2
      rest = Math.floor(rest / 5)
      return value
    })
    let expected = -Infinity
    for (let left = 0; left < nums.length; left++) {
      let product = 1
      for (let right = left; right < nums.length; right++) {
        product *= nums[right]
        expected = Math.max(expected, product)
      }
    }
    assert.ok(maxProduct(nums) === expected)
  }
})

test('独立复核子集型状态与完整掩码枚举对照', () => {
  for (let mask = 0; mask < 1024; mask++) {
    let rest = mask
    const nums = Array.from({ length: 5 }, () => {
      const value = rest % 4 + 1
      rest = Math.floor(rest / 4)
      return value
    })
    const total = nums.reduce((sum, value) => sum + value, 0)
    let partition = false
    let profit = 0
    let lis = 0
    for (let subset = 0; subset < 32; subset++) {
      let sum = 0
      const selected: number[] = []
      for (let i = 0; i < nums.length; i++) {
        if ((subset >> i) & 1) {
          sum += nums[i]
          selected.push(nums[i])
        }
      }
      if (sum * 2 === total) partition = true
      if ((subset & (subset << 1)) === 0) profit = Math.max(profit, sum)
      if (selected.every((value, i) => i === 0 || selected[i - 1] < value)) lis = Math.max(lis, selected.length)
    }
    assert.equal(canPartition(nums), partition)
    assert.equal(rob(nums), profit)
    assert.equal(lengthOfLIS(nums), lis)
  }
})

test('独立复核零钱使用逐层金额可达搜索', () => {
  for (let mask = 1; mask < 32; mask++) {
    const coins = Array.from({ length: 5 }, (_, i) => i + 1).filter(value => (mask >> (value - 1)) & 1)
    for (let target = 0; target <= 20; target++) {
      const seen = new Set<number>([0])
      let frontier = [0]
      let distance = 0
      let expected = target === 0 ? 0 : -1
      while (frontier.length && expected === -1) {
        distance++
        const next: number[] = []
        for (const amount of frontier) {
          for (const coin of coins) {
            const value = amount + coin
            if (value > target || seen.has(value)) continue
            if (value === target) expected = distance
            seen.add(value)
            next.push(value)
          }
        }
        frontier = next
      }
      assert.equal(coinChange(coins, target), expected)
    }
  }
})

test('独立复核单词拆分使用逐词消费递归', () => {
  const candidates = ['a', 'b', 'aa', 'ab', 'ba', 'bb']
  for (let dictionaryMask = 1; dictionaryMask < 64; dictionaryMask++) {
    const dictionary = candidates.filter((_, index) => (dictionaryMask >> index) & 1)
    const enumerate = (remaining: string): boolean => remaining === '' || dictionary.some(word => remaining.startsWith(word) && enumerate(remaining.slice(word.length)))
    for (let mask = 0; mask < 32; mask++) {
      const word = Array.from({ length: 5 }, (_, index) => (mask >> index) & 1 ? 'a' : 'b').join('')
      assert.equal(wordBreak(word, dictionary), enumerate(word))
    }
  }
})

import { longestPalindrome } from '../solutions/16/0005.js'
import { longestCommonSubsequence } from '../solutions/16/1143.js'
import { minDistance } from '../solutions/16/0072.js'
import { uniquePaths } from '../solutions/16/0062.js'
import { minPathSum } from '../solutions/16/0064.js'

test('独立复核回文与公共子序列使用直接枚举', () => {
  const words = ['']
  for (let length = 1; length <= 5; length++) {
    for (let mask = 0; mask < 2 ** length; mask++) words.push(Array.from({ length }, (_, i) => (mask >> i) & 1 ? 'a' : 'b').join(''))
  }
  for (const word of words) {
    let best = 0
    for (let left = 0; left < word.length; left++) {
      for (let right = left + 1; right <= word.length; right++) {
        const piece = word.slice(left, right)
        if (piece === [...piece].reverse().join('')) best = Math.max(best, piece.length)
      }
    }
    if (word !== '') {
      const actual = longestPalindrome(word)
      assert.equal(actual.length, best)
      assert.ok(word.includes(actual))
      assert.equal(actual, [...actual].reverse().join(''))
    }
    for (const other of words) {
      if (word === '' || other === '') continue
      let expected = 0
      for (let mask = 0; mask < 2 ** word.length; mask++) {
        const candidate = [...word].filter((_, i) => (mask >> i) & 1).join('')
        let at = 0
        for (const char of other) if (char === candidate[at]) at++
        if (at === candidate.length) expected = Math.max(expected, candidate.length)
      }
      assert.equal(longestCommonSubsequence(word, other), expected)
    }
  }
})

test('独立复核编辑距离使用实际编辑字符串的分层搜索', () => {
  const words = ['']
  for (let length = 1; length <= 3; length++) {
    for (let mask = 0; mask < 2 ** length; mask++) words.push(Array.from({ length }, (_, i) => (mask >> i) & 1 ? 'a' : 'b').join(''))
  }
  for (const source of words) {
    const distance = new Map<string, number>([[source, 0]])
    const queue = [source]
    for (let head = 0; head < queue.length; head++) {
      const current = queue[head]
      const oldDistance = distance.get(current)!
      if (oldDistance === 3) continue
      const candidates: string[] = []
      for (let i = 0; i < current.length; i++) {
        candidates.push(current.slice(0, i) + current.slice(i + 1))
        for (const char of ['a', 'b']) candidates.push(current.slice(0, i) + char + current.slice(i + 1))
      }
      if (current.length < 4) {
        for (let i = 0; i <= current.length; i++) {
          for (const char of ['a', 'b']) candidates.push(current.slice(0, i) + char + current.slice(i))
        }
      }
      for (const next of candidates) {
        if (distance.has(next)) continue
        distance.set(next, oldDistance + 1)
        queue.push(next)
      }
    }
    for (const target of words) assert.equal(minDistance(source, target), distance.get(target))
  }
})

test('独立复核网格状态使用完整路线枚举', () => {
  const routes = (rows: number, cols: number, row = 0, col = 0): number => {
    if (row === rows - 1 && col === cols - 1) return 1
    return (row + 1 < rows ? routes(rows, cols, row + 1, col) : 0) + (col + 1 < cols ? routes(rows, cols, row, col + 1) : 0)
  }
  for (let rows = 1; rows <= 5; rows++) for (let cols = 1; cols <= 5; cols++) assert.equal(uniquePaths(rows, cols), routes(rows, cols))
  for (let mask = 0; mask < 729; mask++) {
    let rest = mask
    const grid = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => {
      const value = rest % 3
      rest = Math.floor(rest / 3)
      return value
    }))
    const paths: number[] = []
    const visit = (row: number, col: number, sum: number): void => {
      sum += grid[row][col]
      if (row === 1 && col === 2) paths.push(sum)
      if (row < 1) visit(row + 1, col, sum)
      if (col < 2) visit(row, col + 1, sum)
    }
    visit(0, 0, 0)
    assert.equal(minPathSum(grid), Math.min(...paths))
  }
})

import { combinationSum } from '../solutions/10/0039.js'
import { partition } from '../solutions/10/0131.js'
import { exist } from '../solutions/10/0079.js'
import { solveNQueens } from '../solutions/10/0051.js'
import { generateParenthesis } from '../solutions/10/0022.js'
import { subsets } from '../solutions/10/0078.js'

const normalizeRows = (rows: (number | string)[][]): string[] => rows.map(row => JSON.stringify(row)).sort()

test('独立复核组合总和使用每种值的次数枚举', () => {
  for (let mask = 1; mask < 16; mask++) {
    const values = [1, 2, 3, 4].filter((_, i) => (mask >> i) & 1)
    for (let target = 1; target <= 9; target++) {
      const expected: number[][] = []
      const chooseCount = (index: number, sum: number, path: number[]): void => {
        if (index === values.length) {
          if (sum === target) expected.push(path)
          return
        }
        const value = values[index]
        for (let count = 0; count * value + sum <= target; count++) chooseCount(index + 1, sum + count * value, [...path, ...Array<number>(count).fill(value)])
      }
      chooseCount(0, 0, [])
      assert.deepEqual(normalizeRows(combinationSum(values, target)), normalizeRows(expected))
    }
  }
})

test('独立复核回文切分使用全部间隙掩码', () => {
  for (let length = 1; length <= 6; length++) {
    for (let mask = 0; mask < 2 ** length; mask++) {
      const word = Array.from({ length }, (_, i) => (mask >> i) & 1 ? 'a' : 'b').join('')
      const expected: string[][] = []
      for (let cuts = 0; cuts < 2 ** (length - 1); cuts++) {
        const pieces: string[] = []
        let start = 0
        for (let end = 0; end < length; end++) {
          if (end === length - 1 || ((cuts >> end) & 1)) {
            pieces.push(word.slice(start, end + 1))
            start = end + 1
          }
        }
        if (pieces.every(piece => piece === [...piece].reverse().join(''))) expected.push(pieces)
      }
      assert.deepEqual(normalizeRows(partition(word)), normalizeRows(expected))
    }
  }
})

test('独立复核单词搜索使用不可变路径状态队列', () => {
  for (let mask = 0; mask < 16; mask++) {
    const board = Array.from({ length: 2 }, (_, row) => Array.from({ length: 2 }, (_, col) => (mask >> (row * 2 + col)) & 1 ? 'A' : 'B'))
    for (let length = 1; length <= 4; length++) {
      for (let pattern = 0; pattern < 2 ** length; pattern++) {
        const word = Array.from({ length }, (_, i) => (pattern >> i) & 1 ? 'A' : 'B').join('')
        const queue = Array.from({ length: 4 }, (_, pos) => ({ pos, path: [pos] })).filter(state => board[Math.floor(state.pos / 2)][state.pos % 2] === word[0])
        let expected = false
        for (let head = 0; head < queue.length; head++) {
          const state = queue[head]
          if (state.path.length === word.length) {
            expected = true
            break
          }
          for (let next = 0; next < 4; next++) {
            const adjacent = Math.abs(Math.floor(next / 2) - Math.floor(state.pos / 2)) + Math.abs(next % 2 - state.pos % 2) === 1
            if (adjacent && !state.path.includes(next) && board[Math.floor(next / 2)][next % 2] === word[state.path.length]) queue.push({ pos: next, path: [...state.path, next] })
          }
        }
        const before = structuredClone(board)
        assert.equal(exist(board, word), expected)
        assert.deepEqual(board, before)
      }
    }
  }
})

test('独立复核皇后使用全部列配置后验检查', () => {
  for (let n = 1; n <= 5; n++) {
    const expected: string[] = []
    for (let mask = 0; mask < n ** n; mask++) {
      let remaining = mask
      const cols = Array.from({ length: n }, () => {
        const col = remaining % n
        remaining = Math.floor(remaining / n)
        return col
      })
      let valid = true
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (cols[i] === cols[j] || Math.abs(cols[i] - cols[j]) === j - i) valid = false
      if (valid) expected.push(cols.join(','))
    }
    const actual = solveNQueens(n).map(board => board.map(row => row.indexOf('Q')).join(','))
    assert.deepEqual(actual.sort(), expected.sort())
  }
})

test('独立复核括号与子集使用完整二进制选择枚举', () => {
  for (let n = 1; n <= 5; n++) {
    const expected: string[] = []
    for (let mask = 0; mask < 2 ** (2 * n); mask++) {
      const word = Array.from({ length: 2 * n }, (_, i) => (mask >> i) & 1 ? '(' : ')').join('')
      let balance = 0
      let valid = true
      for (const char of word) {
        balance += char === '(' ? 1 : -1
        if (balance < 0) valid = false
      }
      if (valid && balance === 0) expected.push(word)
    }
    assert.deepEqual(generateParenthesis(n).sort(), expected.sort())
    const values = Array.from({ length: n }, (_, i) => i - 2)
    const expectedSubsets = Array.from({ length: 2 ** n }, (_, mask) => values.filter((_, i) => (mask >> i) & 1))
    assert.deepEqual(normalizeRows(subsets(values)), normalizeRows(expectedSubsets))
  }
})
