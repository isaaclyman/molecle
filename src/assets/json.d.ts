declare module '*.json' {
  interface ITrieNode {
    [key: string]: ITrieNode
  }

  const content: ITrieNode
  export default content
}
