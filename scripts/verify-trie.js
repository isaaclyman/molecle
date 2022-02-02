const fs = require('fs')

const triePath = __dirname + '/../src/assets/all_words_6_trie.json'
const trieString = fs.readFileSync(triePath, 'utf8')
const trie = JSON.parse(trieString)

const commonPath = __dirname + '/../src/assets/common_words_6.txt'
const commonString = fs.readFileSync(commonPath, 'utf8')
const commonWords = commonString.split(/\r?\n/)

for (const word of commonWords) {
  let node = trie
  for (const char of word.split('')) {
    if (!node[char]) {
      console.warn(`Word not found: ${word} on character ${char}`)
      break
    }
    node = node[char]
  }
}

console.log('Processed and verified all common words.')