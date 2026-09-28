class TrieNode {
  children = new Map<string, TrieNode>()
  terminal = false
}

export class Trie {
  private readonly root = new TrieNode()

  insert(word: string): void {
    let node = this.root
    for (const char of word) {
      if (!node.children.has(char)) node.children.set(char, new TrieNode())
      node = node.children.get(char)!
    }
    // 路径存在不代表完整单词存在 只标记真正的末尾
    node.terminal = true
  }

  search(word: string): boolean {
    return this.walk(word)?.terminal === true
  }

  startsWith(prefix: string): boolean {
    return this.walk(prefix) !== null
  }

  private walk(text: string): TrieNode | null {
    let node = this.root
    for (const char of text) {
      const next = node.children.get(char)
      if (next === undefined) return null
      node = next
    }
    return node
  }
}
