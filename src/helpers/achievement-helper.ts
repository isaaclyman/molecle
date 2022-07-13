import { CellState, GridState } from './grid-helper'

export interface Achievement {
  label: string
  description: string
}

const Achievement = {
  SUSPICIOUS1: {
    label: 'Yeah, right',
    description:
      'You got the Sootly in one guess. Good luck getting anyone to believe you.',
  },
  LUCKY2: {
    label: 'Lucky',
    description:
      'You got the Sootly in two guesses. That makes you a very lucky nerd.',
  },
  PAR3: {
    label: 'Par',
    description:
      'You got the word in three guesses. Here at Sootly, we consider that a perfect score.',
  },
  LASTCHANCE7: {
    label: 'Last Chance',
    description:
      'You got the Sootly on your last try, but at least you got it.',
  },
  ALLHALF: {
    label: 'Half and Half',
    description:
      'You guessed only bad pairs and half pairs. Your powers of deduction are showing.',
  },
  NOGREEN: {
    label: 'Green Surprise',
    description:
      'You got the Sootly without any full or perfect pairs. Very impressive.',
  },
  MOSTLYWRONG: {
    label: 'Mostly Wrong',
    description: 'You guessed mostly bad pairs. Way to narrow things down!',
  },
}

export const getAchievements = function (
  gridData: GridState,
  hasWon: boolean
): Achievement[] {
  const fullRows = gridData.filter((row) => row.every((cell) => !!cell.letter))

  if (!hasWon) {
    return []
  }

  if (fullRows.length === 1) {
    return [Achievement.SUSPICIOUS1]
  }

  const achievements: Achievement[] = []

  if (fullRows.length === 2) {
    achievements.push(Achievement.LUCKY2)
  } else if (fullRows.length === 3) {
    achievements.push(Achievement.PAR3)
  } else if (fullRows.length === 7) {
    achievements.push(Achievement.LASTCHANCE7)
  }

  const priorGuesses = fullRows.slice(0, -1)
  const priorCells = priorGuesses.reduce((cells, row) => cells.concat(row), [])

  const halfAndHalfStates = [
    CellState.None,
    CellState.Wrong,
    CellState.OneRightLetter,
  ]
  if (
    priorCells.every((cell) => halfAndHalfStates.includes(cell.state)) &&
    priorCells.filter((cell) => cell.state === CellState.OneRightLetter)
      .length > 0
  ) {
    achievements.push(Achievement.ALLHALF)
  }

  const nonGreenStates = [
    CellState.None,
    CellState.Wrong,
    CellState.OneRightLetter,
    CellState.TwoRightLetters,
  ]
  if (
    !achievements.includes(Achievement.ALLHALF) &&
    priorCells.every((cell) => nonGreenStates.includes(cell.state))
  ) {
    achievements.push(Achievement.NOGREEN)
  }

  const wrongCellCount = priorCells.filter(
    (cell) => cell.state === CellState.Wrong
  ).length
  if (wrongCellCount > priorCells.length / 2) {
    achievements.push(Achievement.MOSTLYWRONG)
  }

  return achievements
}
