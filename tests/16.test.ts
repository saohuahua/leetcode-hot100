import test from 'node:test'
import assert from 'node:assert/strict'

import { longestPalindrome } from '../solutions/16/0005.js'
test('0005 示例与奇偶回文',()=>{
 assert.ok(['bab','aba'].includes(longestPalindrome('babad')))
 assert.equal(longestPalindrome('cbbd'),'bb');assert.equal(longestPalindrome('a'),'a')
 assert.equal(longestPalindrome('abba'),'abba');assert.equal(longestPalindrome('aaaa'),'aaaa')
})

import { longestCommonSubsequence } from '../solutions/16/1143.js'
test('1143 示例与顺序约束',()=>{
 assert.equal(longestCommonSubsequence('abcde','ace'),3)
 assert.equal(longestCommonSubsequence('abc','abc'),3)
 assert.equal(longestCommonSubsequence('abc','def'),0)
 assert.equal(longestCommonSubsequence('ab','ba'),1)
 assert.equal(longestCommonSubsequence('aaa','aa'),2)
})

import { minDistance } from '../solutions/16/0072.js'
test('0072 示例与空串和相同串',()=>{
 assert.equal(minDistance('horse','ros'),3);assert.equal(minDistance('intention','execution'),5)
 assert.equal(minDistance('','abc'),3);assert.equal(minDistance('abc',''),3)
 assert.equal(minDistance('',''),0);assert.equal(minDistance('same','same'),0)
 assert.equal(minDistance('ab','ba'),2)
})

import { uniquePaths } from '../solutions/16/0062.js'
test('0062 示例与单行单格',()=>{
 assert.equal(uniquePaths(3,7),28);assert.equal(uniquePaths(3,2),3)
 assert.equal(uniquePaths(1,1),1);assert.equal(uniquePaths(1,8),1)
})

import { minPathSum } from '../solutions/16/0064.js'
test('0064 示例 单格零与输入保持',()=>{
 const grid=[[1,3,1],[1,5,1],[4,2,1]];const before=structuredClone(grid)
 assert.equal(minPathSum(grid),7);assert.deepEqual(grid,before)
 assert.equal(minPathSum([[1,2,3],[4,5,6]]),12);assert.equal(minPathSum([[0]]),0)
})
