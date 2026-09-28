import test from 'node:test'
import assert from 'node:assert/strict'

import { search } from '../solutions/11/0033.js'
test('0033 示例以及全部小规模旋转位置', () => {
 assert.equal(search([4,5,6,7,0,1,2],0),4)
 assert.equal(search([4,5,6,7,0,1,2],3),-1)
 assert.equal(search([1],0),-1)
 for(let n=1;n<=12;n++){
 const base=Array.from({length:n},(_,i)=>i*2)
 for(let k=0;k<n;k++){
 const a=[...base.slice(k),...base.slice(0,k)]
 for(let target=-1;target<=2*n;target++) assert.equal(search(a,target),a.indexOf(target))
 }}
})

import { findMin } from '../solutions/11/0153.js'
test('0153 示例与所有小规模旋转位置', () => {
 assert.equal(findMin([3,4,5,1,2]),1)
 assert.equal(findMin([4,5,6,7,0,1,2]),0)
 assert.equal(findMin([11,13,15,17]),11)
 for(let n=1;n<=12;n++){
 const a=Array.from({length:n},(_,i)=>i-3)
 for(let k=0;k<n;k++) assert.equal(findMin([...a.slice(k),...a.slice(0,k)]),-3)
 }
})

import { findMedianSortedArrays } from '../solutions/11/0004.js'
test('0004 示例 空数组及独立合并对照', () => {
 assert.equal(findMedianSortedArrays([1,3],[2]),2)
 assert.equal(findMedianSortedArrays([1,2],[3,4]),2.5)
 assert.equal(findMedianSortedArrays([],[1]),1)
 assert.equal(findMedianSortedArrays([0,0],[0,0]),0)
 const arrays: number[][]=[[]]
 const visit=(a:number[],start:number)=>{if(a.length===4)return;for(let x=start;x<=2;x++){const b=[...a,x];arrays.push(b);visit(b,x)}}
 visit([],-2)
 for(const a of arrays)for(const b of arrays){
 if(a.length+b.length===0)continue
 const sorted=[...a,...b].sort((x,y)=>x-y)
 const n=sorted.length
 const expected=n%2?sorted[Math.floor(n/2)]:(sorted[n/2-1]+sorted[n/2])/2
 assert.equal(findMedianSortedArrays(a,b),expected)
 }
})

import { searchInsert } from '../solutions/11/0035.js'
test('0035 示例与两侧插入边界', () => {
  assert.equal(searchInsert([1,3,5,6],5),2)
  assert.equal(searchInsert([1,3,5,6],2),1)
  assert.equal(searchInsert([1,3,5,6],7),4)
  assert.equal(searchInsert([1],0),0)
})

import { searchMatrix } from '../solutions/11/0074.js'
test('0074 示例与单格边界', () => {
 const m=[[1,3,5,7],[10,11,16,20],[23,30,34,60]]
 assert.equal(searchMatrix(m,3),true)
 assert.equal(searchMatrix(m,13),false)
 assert.equal(searchMatrix([[1]],1),true)
 assert.equal(searchMatrix([[1]],2),false)
})

import { searchRange } from '../solutions/11/0034.js'
test('0034 示例 空输入和全相同', () => {
 assert.deepEqual(searchRange([5,7,7,8,8,10],8),[3,4])
 assert.deepEqual(searchRange([5,7,7,8,8,10],6),[-1,-1])
 assert.deepEqual(searchRange([],0),[-1,-1])
 assert.deepEqual(searchRange([2,2,2],2),[0,2])
})
