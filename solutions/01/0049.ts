export function groupAnagrams(strs: string[]): string[][] {
  // 用排序后的字母序列标识同一类单词
  const groups = new Map<string, string[]>()
  for (const word of strs) {
    const key = word.split('').sort().join('')
    const group = groups.get(key)
    if (group === undefined) groups.set(key, [word])
    else group.push(word)
  }
  return [...groups.values()]
}
