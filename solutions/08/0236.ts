import { TreeNode } from '../shared.js'

export function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if (root === null) return null
  const parents = new Map<TreeNode, TreeNode | null>([[root, null]])
  const stack: TreeNode[] = [root]
  // 显式待办栈建立父关系避免深树递归溢出
  while ((!parents.has(p) || !parents.has(q)) && stack.length > 0) {
    const node = stack.pop()!
    for (const child of [node.left, node.right]) {
      if (child !== null) {
        parents.set(child, node)
        stack.push(child)
      }
    }
  }
  if (!parents.has(p) || !parents.has(q)) return null
  const ancestors = new Set<TreeNode>()
  let current: TreeNode | null = p
  while (current !== null) {
    ancestors.add(current)
    current = parents.get(current)!
  }
  current = q
  // 从目标向上首次命中的共同祖先就是最深者
  while (current !== null && !ancestors.has(current)) current = parents.get(current)!
  return current
}
