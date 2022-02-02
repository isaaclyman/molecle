import commonTxt from '../assets/common_words_6.txt'

const arrayOfCommonWords = (commonTxt as string).split(/\r?\n/)
const numberOfCommonWords = arrayOfCommonWords.length

const now = new Date()
const anchor = new Date(2020, 0, 1)

const msInDay = 1000 * 60 * 60 * 24

const daysSinceAnchor = Math.floor((now.getTime() - anchor.getTime()) / msInDay)
const constrainedDay = daysSinceAnchor % numberOfCommonWords

export const todaysWord = arrayOfCommonWords[constrainedDay]
