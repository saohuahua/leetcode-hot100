export function productExceptSelf(nums: number[]): number[] {
  const result = new Array<number>(nums.length)
  let prefix = 1
  for (let i = 0; i < nums.length; i++) {
    // 当前结果先保存左侧所有数的乘积
    result[i] = prefix
    prefix *= nums[i]
  }
  let suffix = 1
  for (let i = nums.length - 1; i >= 0; i--) {
    // 乘上右侧乘积后再把当前数纳入后缀
    result[i] *= suffix
    suffix *= nums[i]
  }
  return result
}
