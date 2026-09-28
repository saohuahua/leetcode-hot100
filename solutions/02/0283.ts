export function moveZeroes(nums: number[]): void {
  // 写入位置之前都是按原顺序保留的非零值
  let write = 0
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) nums[write++] = nums[read]
  }
  // 非零值搬完后尾部统一补零
  while (write < nums.length) nums[write++] = 0
}
