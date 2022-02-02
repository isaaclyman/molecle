import { isLegitimateWord } from './word-helper'
import { todaysWord } from './word-chooser'

export enum CellState {
  None = 'none', // gray
  Wrong = 'wrong', // gray
  OneRightLetter = 'one-right-letter', // one letter is in the word - half yellow
  TwoRightLetters = 'two-right-letters', // both letters are in the word - all yellow
  RightPair = 'right-pair', // both letters are in the word in the same pair - half green
  RightPairRightPosition = 'right-pair-right-position', // this pair is in the word in this position - all green
}

export interface Cell {
  letter: string | null
  state: CellState
}

export type GridState = Cell[][]

export const generateEmptyState = (chances: number): Cell[][] => {
  const rows = []
  for (let i = 0; i < chances; i++) {
    const row = []
    for (let j = 0; j < 6; j++) {
      row.push({ letter: null, state: CellState.None })
    }
    rows.push(row)
  }
  return rows
}

export enum GridEvent {
  None = 'none',
  Advance = 'advance',
  InvalidWord = 'invalid-word',
  Win = 'win',
}

export function addLetter(
  gridState: GridState,
  lineNumber: number,
  letter: string
): GridEvent {
  const isSingleLetter = /^[A-Z]$/.test(letter)
  const line = gridState[lineNumber]
  const emptyCell = line.find((cell) => cell.letter === null)

  if (isSingleLetter && emptyCell) {
    emptyCell.letter = letter
    return GridEvent.None
  } else if (isSingleLetter && !emptyCell) {
    return GridEvent.None
  }

  const isBackspace = letter === 'BACKSPACE'
  const lastNonEmptyCell = line
    .slice()
    .reverse()
    .find((cell) => cell.letter !== null)
  if (isBackspace && lastNonEmptyCell) {
    lastNonEmptyCell.letter = null
    return GridEvent.None
  } else if (isBackspace && !lastNonEmptyCell) {
    return GridEvent.None
  }

  const isEnter = letter === 'ENTER'
  const allCellsFilled = line.every((cell) => cell.letter !== null)
  if (isEnter && allCellsFilled) {
    const word = gridState[lineNumber].map((cell) => cell.letter).join('')
    if (!isLegitimateWord(word)) {
      return GridEvent.InvalidWord
    }

    setCellStates(gridState[lineNumber], todaysWord.toUpperCase())
    if (word.toUpperCase() === todaysWord.toUpperCase()) {
      return GridEvent.Win
    }

    return GridEvent.Advance
  } else if (isEnter && !allCellsFilled) {
    return GridEvent.None
  }

  return GridEvent.None
}

function setCellStates(line: Cell[], correctWord: string): void {
  const attempt = line
    .map((cell) => cell.letter)
    .join('')
    .toUpperCase()

  const correctPairs: string[][] = []
  for (let pairNumber = 0; pairNumber < 3; pairNumber++) {
    correctPairs.push(
      correctWord.slice(pairNumber * 2, pairNumber * 2 + 2).split('')
    )
  }

  for (let pairNumber = 0; pairNumber < 3; pairNumber++) {
    const attemptPair = attempt
      .slice(pairNumber * 2, pairNumber * 2 + 2)
      .split('')
    const attemptCells = line.slice(pairNumber * 2, pairNumber * 2 + 2)

    const matchingCorrectPair = correctPairs.find(
      (cp) =>
        cp.includes(attemptPair[0]) &&
        cp.includes(attemptPair[1]) &&
        attemptPair.includes(cp[0]) &&
        attemptPair.includes(cp[1])
    )

    if (
      matchingCorrectPair &&
      correctPairs.indexOf(matchingCorrectPair) === pairNumber
    ) {
      attemptCells.forEach(
        (cell) => (cell.state = CellState.RightPairRightPosition)
      )
      continue
    } else if (matchingCorrectPair) {
      attemptCells.forEach((cell) => (cell.state = CellState.RightPair))
      continue
    }

    const bothLettersCorrect =
      correctWord.includes(attemptPair[0]) &&
      correctWord.includes(attemptPair[1])
    if (bothLettersCorrect) {
      attemptCells.forEach((cell) => (cell.state = CellState.TwoRightLetters))
      continue
    }

    const oneLetterCorrect =
      correctWord.includes(attemptPair[0]) ||
      correctWord.includes(attemptPair[1])
    if (oneLetterCorrect) {
      attemptCells.forEach((cell) => (cell.state = CellState.OneRightLetter))
      continue
    }

    attemptCells.forEach((cell) => (cell.state = CellState.Wrong))
  }
}
