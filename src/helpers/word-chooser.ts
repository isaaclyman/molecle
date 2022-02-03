import commonTxt from '../assets/common_words_6.txt'

const data = {
  todaysWord: '',
  puzzleNumber: 0,
}

export function setWord(chooseRandom = false): void {
  const arrayOfCommonWords = (commonTxt as string).split(/\r?\n/)
  const numberOfCommonWords = arrayOfCommonWords.length

  let puzzleNumber = 0
  if (!chooseRandom) {
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
