import commonTxt from '../assets/common_words_6.txt'
import queryString from 'query-string'

const data = {
  todaysWord: '',
  puzzleNumber: 0,
}

const query = queryString.parse(window.location.search)

export function setWord(chooseRandom = false): void {
  const arrayOfCommonWords = (commonTxt as string).split(/\r?\n/)
  const numberOfCommonWords = arrayOfCommonWords.length

  let puzzleNumber = 0
  if (!chooseRandom && query['puzzle'] && !isNaN(Number(query['puzzle']))) {
    puzzleNumber = Number(query['puzzle'])
    const newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname
    window.history.replaceState({ path: newurl }, '', newurl)
  } else if (!chooseRandom) {
    const now = new Date()
    const anchor = new Date(2020, 0, 1)

    const msInDay = 1000 * 60 * 60 * 24

    const daysSinceAnchor = Math.floor(
      (now.getTime() - anchor.getTime()) / msInDay
    )
    puzzleNumber = daysSinceAnchor % numberOfCommonWords
  } else {
    puzzleNumber = Math.floor(Math.random() * numberOfCommonWords)
  }

  data.puzzleNumber = puzzleNumber
  data.todaysWord = arrayOfCommonWords[data.puzzleNumber]
}

setWord()
export const wordData = data
export const getPuzzleLink = function (puzzleNumber: number): string {
  return `https://isaaclyman.com/sootly?puzzle=${puzzleNumber}`
}
