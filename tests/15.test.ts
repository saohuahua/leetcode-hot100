import test from 'node:test'
import assert from 'node:assert/strict'
import { climbStairs } from '../solutions/15/0070.js'

test('0070 官方示例和合法边界', () => {
  assert.equal(climbStairs(2), 2)
  assert.equal(climbStairs(3), 3)
  assert.equal(climbStairs(1), 1)
  assert.equal(climbStairs(45), 1836311903)
})

test('0070 不同顺序属于不同走法', () => {
  assert.equal(climbStairs(4), 5)
  assert.equal(climbStairs(5), 8)
})

test('0070 小输入与独立枚举对照', () => {
  const enumerate = (remaining: number): number => {
    if (remaining === 0) return 1
    if (remaining < 0) return 0
    return enumerate(remaining - 1) + enumerate(remaining - 2)
  }
  for (let n = 1; n <= 15; n++) {
    assert.equal(climbStairs(n), enumerate(n), `n=${n}`)
  }
})

import { maxProduct } from '../solutions/15/0152.js'
test('0152 示例与负负转正',()=>{
 assert.equal(maxProduct([2,3,-2,4]),6);assert.equal(maxProduct([-2,0,-1]),0)
 assert.equal(maxProduct([-2,3,-4]),24);assert.equal(maxProduct([-2]),-2)
})

import { canPartition } from '../solutions/15/0416.js'
test('0416 示例与错误重复使用反例',()=>{
 assert.equal(canPartition([1,5,11,5]),true);assert.equal(canPartition([1,2,3,5]),false)
 assert.equal(canPartition([1,2,5]),false);assert.equal(canPartition([1]),false)
 assert.equal(canPartition([2,2]),true)
})

import { longestValidParentheses } from '../solutions/15/0032.js'
test('0032 示例与左右连接及枚举对照',()=>{
 assert.equal(longestValidParentheses('(()'),2);assert.equal(longestValidParentheses(')()())'),4)
 assert.equal(longestValidParentheses(''),0);assert.equal(longestValidParentheses('()(())'),6)
 const brute=(s:string)=>{let best=0;for(let l=0;l<s.length;l++){let balance=0;for(let r=l;r<s.length;r++){balance+=s[r]==='('?1:-1;if(balance<0)break;if(balance===0)best=Math.max(best,r-l+1)}}return best}
 const visit=(s:string)=>{assert.equal(longestValidParentheses(s),brute(s),s);if(s.length<10){visit(s+'(');visit(s+')')}}
 visit('')
})

import { coinChange } from '../solutions/15/0322.js'
test('0322 示例 零金额及贪心反例',()=>{
 assert.equal(coinChange([1,2,5],11),3);assert.equal(coinChange([2],3),-1)
 assert.equal(coinChange([1],0),0);assert.equal(coinChange([1,3,4],6),2)
})

import { wordBreak } from '../solutions/15/0139.js'
test('0139 示例与最长词优先反例',()=>{
 assert.equal(wordBreak('leetcode',['leet','code']),true)
 assert.equal(wordBreak('applepenapple',['apple','pen']),true)
 assert.equal(wordBreak('catsandog',['cats','dog','sand','and','cat']),false)
 assert.equal(wordBreak('abcd',['abc','ab','cd']),true)
 assert.equal(wordBreak('a',['b']),false)
})

import { lengthOfLIS } from '../solutions/15/0300.js'
test('0300 示例与严格递增边界',()=>{
 assert.equal(lengthOfLIS([10,9,2,5,3,7,101,18]),4)
 assert.equal(lengthOfLIS([0,1,0,3,2,3]),4)
 assert.equal(lengthOfLIS([7,7,7,7]),1)
 assert.equal(lengthOfLIS([1,2,3,0]),3);assert.equal(lengthOfLIS([5]),1)
})

import { generate } from '../solutions/15/0118.js'
test('0118 示例与独立行引用',()=>{
 assert.deepEqual(generate(5),[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]])
 assert.deepEqual(generate(1),[[1]])
 const rows=generate(3);rows[1][0]=9;assert.equal(rows[0][0],1)
})

import { rob } from '../solutions/15/0198.js'
test('0198 示例与不能只选奇偶位置',()=>{
 assert.equal(rob([1,2,3,1]),4);assert.equal(rob([2,7,9,3,1]),12)
 assert.equal(rob([2,1,1,2]),4);assert.equal(rob([0]),0);assert.equal(rob([8]),8)
})

import { numSquares } from '../solutions/15/0279.js'
test('0279 示例与最大平方数贪心反例',()=>{
 assert.equal(numSquares(12),3);assert.equal(numSquares(13),2)
 assert.equal(numSquares(1),1);assert.equal(numSquares(16),1);assert.equal(numSquares(7),4)
})
