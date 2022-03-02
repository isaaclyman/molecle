import { GridState } from './grid-helper'

const storageKey = 'sootly-remembers-puzzles'

interface RememberedPuzzle {
  puzzleNumber: number
  startDate: string
  gridData: GridState
}

class RememberHelperClass {
  savePuzzle(puzzleNumber: number, gridData: GridState) {
    const rememberedPuzzles = this.getPuzzles()
    const existing = rememberedPuzzles.find(
      (p) => p.puzzleNumber === puzzleNumber
    )

    if (existing) {
      existing.gridData = gridData
    } else {
      const newPuzzle: RememberedPuzzle = {
        puzzleNumber,
        startDate: new Date().toISOString(),
        gridData,
      }
      rememberedPuzzles.push(newPuzzle)
    }

    localStorage.setItem(storageKey, JSON.stringify(rememberedPuzzles))
  }

  getPuzzles(): RememberedPuzzle[] {
    const rememberedPuzzles = JSON.parse(
      localStorage.getItem(storageKey) || '[]'
    ) as RememberedPuzzle[]

    this.removeObsoletePuzzles(rememberedPuzzles)

    localStorage.setItem(storageKey, JSON.stringify(rememberedPuzzles))

    return rememberedPuzzles
  }

  removeObsoletePuzzles(rememberedPuzzles: RememberedPuzzle[]) {
    const outdatedPuzzles = [] as RememberedPuzzle[]

    for (const puzzle of rememberedPuzzles) {
      const startDate = new Date(puzzle.startDate).getTime()
      const now = new Date().getTime()
      const timeDiff = now - startDate
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

      if (days > 3) {
        outdatedPuzzles.push(puzzle)
      }
    }

    for (const puzzle of outdatedPuzzles) {
      const index = rememberedPuzzles.indexOf(puzzle)
      rememberedPuzzles.splice(index, 1)
    }
  }

  getPuzzle(puzzleNumber: number) {
    const rememberedPuzzles = this.getPuzzles()
    return rememberedPuzzles.find(
      (puzzle) => puzzle.puzzleNumber === puzzleNumber
    )
  }
}

export const RememberHelper = new RememberHelperClass()
