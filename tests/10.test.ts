import test from 'node:test'
import assert from 'node:assert/strict'

import { exist } from '../solutions/10/0079.js'
test('0079 示例 禁止复用与输入恢复',()=>{
 const b=[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']];const before=structuredClone(b)
 assert.equal(exist(b,'ABCCED'),true);assert.deepEqual(b,before)
 assert.equal(exist(b,'SEE'),true);assert.equal(exist(b,'ABCB'),false)
 assert.equal(exist([['a']],'a'),true);assert.equal(exist([['A','B']],'ABA'),false)
})

import { partition } from '../solutions/10/0131.js'
test('0131 示例与较长片段重新成为回文',()=>{
 assert.deepEqual(partition('aab'),[['a','a','b'],['aa','b']])
 assert.deepEqual(partition('a'),[['a']])
 assert.deepEqual(partition('aba'),[['a','b','a'],['aba']])
 assert.equal(partition('aaaa').length,8)
})

import { solveNQueens } from '../solutions/10/0051.js'
test('0051 示例 无解与棋盘攻击校验',()=>{
 assert.deepEqual(solveNQueens(1),[['Q']]);assert.deepEqual(solveNQueens(2),[]);assert.deepEqual(solveNQueens(3),[])
 assert.equal(solveNQueens(4).length,2);assert.equal(solveNQueens(5).length,10)
 for(const board of solveNQueens(5)){
 const cols=board.map(row=>row.indexOf('Q'));assert.equal(new Set(cols).size,5)
 assert.equal(new Set(cols.map((c,r)=>r-c)).size,5);assert.equal(new Set(cols.map((c,r)=>r+c)).size,5)
 for(const row of board)assert.equal([...row].filter(c=>c==='Q').length,1)
 }
})

import { combinationSum } from '../solutions/10/0039.js'
test('0039 示例与重复使用和无解',()=>{
 assert.deepEqual(combinationSum([2,3,6,7],7),[[2,2,3],[7]])
 assert.deepEqual(combinationSum([2,3,5],8),[[2,2,2,2],[2,3,3],[3,5]])
 assert.deepEqual(combinationSum([2],1),[])
 const nums=[3,2];combinationSum(nums,5);assert.deepEqual(nums,[3,2])
})

import { generateParenthesis } from '../solutions/10/0022.js'
test('0022 示例与每个前缀合法',()=>{
 assert.deepEqual(generateParenthesis(1),['()'])
 assert.deepEqual(generateParenthesis(3).sort(),['((()))','(()())','(())()','()(())','()()()'].sort())
 for(const s of generateParenthesis(4)){let balance=0;for(const c of s){balance+=c==='('?1:-1;assert.ok(balance>=0)}assert.equal(balance,0)}
 assert.equal(generateParenthesis(4).length,14)
})

import { permute } from '../solutions/10/0046.js'
test('0046 示例与排列完整性',()=>{
 const result=permute([1,2,3]);assert.equal(result.length,6)
 assert.equal(new Set(result.map(x=>x.join(','))).size,6)
 for(const row of result)assert.deepEqual([...row].sort((a,b)=>a-b),[1,2,3])
 assert.deepEqual(permute([0,1]).map(x=>x.join(',')).sort(),['0,1','1,0'])
 assert.deepEqual(permute([1]),[[1]])
})

import { subsets } from '../solutions/10/0078.js'
test('0078 示例与空集',()=>{
 const result=subsets([1,2,3]);assert.equal(result.length,8)
 assert.equal(new Set(result.map(x=>x.join(','))).size,8)
 assert.deepEqual(subsets([0]),[[],[0]]);assert.deepEqual(subsets([]),[[]])
})

import { letterCombinations } from '../solutions/10/0017.js'
test('0017 示例与四字母按键',()=>{
 assert.deepEqual(letterCombinations('23'),['ad','ae','af','bd','be','bf','cd','ce','cf'])
 assert.deepEqual(letterCombinations(''),[]);assert.deepEqual(letterCombinations('2'),['a','b','c'])
 assert.equal(letterCombinations('79').length,16);assert.ok(letterCombinations('22').includes('aa'))
})
