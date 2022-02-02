interface ITrieNode {
  [key: string]: ITrieNode
}

import _allWordsTrie from '@/assets/all_words_6_trie.json'

const allWordsTrie: ITrieNode = _allWordsTrie

export function isLegitimateWord(word: string): boolean {
  word = word.toLowerCase()
  let node = allWordsTrie
  for (const char of word.split('')) {
    if (!node[char]) {
      return false
    }
    node = node[char]
  }
  return true
}
