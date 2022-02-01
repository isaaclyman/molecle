const fs = require('fs')
const es = require('event-stream')

const trie = {}

const appendToTrie = (word) => {
  let node = trie
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    if (!node[char]) {
      node[char] = {}
    }
    node = node[char]
  }
}

console.log('Reading file and producing trie...')

let lineNumber = 0
const filePath = __dirname + '/../resources/all_alphanumeric_words_6.txt'
const outPath = __dirname + '/../resources/all_words_6_trie.json'

async function main() {
  await new Promise((resolve, reject) => {
    const stream = fs
      .createReadStream(filePath)
      .pipe(es.split())
      .pipe(
        es.mapSync(function (line) {
          stream.pause()
    
          lineNumber++
    
          if (lineNumber % 10000 === 0) {
            console.log(`Line ${lineNumber}...`)
          }
    
          appendToTrie(line)
    
          stream.resume()
        })
      )
      .on('error', function (err) {
        console.error(error)
        reject()
      })
      .on('end', function () {
        console.log(`End of file. ${lineNumber} lines read.`)
        resolve()
      })
  })
  
  console.log('Finished reading file. Writing output...')
  
  const jsonTrie = JSON.stringify(trie)
  fs.writeFileSync(outPath, jsonTrie)

  console.log('Wrote to', outPath)
}

main()