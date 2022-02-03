import { CellState, GridState } from './grid-helper'

export enum KeyState {
  None = 'none',
  Wrong = 'wrong',
  MaybeLetter = 'maybe',
  RightLetter = 'right-letter',
  RightPair = 'right-pair',
  RightPairRightPosition = 'right-pair-right-position',
}

export interface Key {
  letter: string
  state: KeyState
}

const keyboardStrings = ['qwertyuiop', 'asdfghjkl', '<zxcvbnm*']

export let keyRows: Key[][] = []
export function generateEmptyKeyRows(): Key[][] {
  return keyboardStrings.map((row) =>
    row.split('').map(
      (letter): Key => ({
        letter:
          letter === '*'
            ? 'ENTER'
            : letter === '<'
            ? 'DEL'
            : letter.toUpperCase(),
        state: KeyState.None,
      })
    )
  )
}
keyRows = generateEmptyKeyRows()

export const validateKey = (key: string): boolean => {
  return /^[A-Z]$/.test(key) || key === 'ENTER' || key === 'BACKSPACE'
}

export const syncGridStateToKeys = (
  gridState: GridState,
  keys: Key[][]
): void => {
  const flatKeys = keys.reduce((acc, row) => [...acc, ...row], [])

  for (const line of gridState) {
    for (const cell of line) {
      const key = flatKeys.find((k) => k.letter === cell.letter)
      if (!key) {
        continue
      }

      if (cell.state === CellState.Wrong) {
        key.state = KeyState.Wrong
        continue
      }

      const statesSuperiorToMaybe = [
        KeyState.Wrong,
        KeyState.RightLetter,
        KeyState.RightPair,
        KeyState.RightPairRightPosition,
      ]

      if (
        cell.state === CellState.OneRightLetter &&
        !statesSuperiorToMaybe.includes(key.state)
      ) {
        key.state = KeyState.MaybeLetter
        continue
      }

      const statesSuperiorToRightLetter = [
        KeyState.RightPair,
        KeyState.RightPairRightPosition,
      ]

      if (
        cell.state === CellState.TwoRightLetters &&
        !statesSuperiorToRightLetter.includes(key.state)
      ) {
        key.state = KeyState.RightLetter
        continue
      }

      const statesSuperiorToRightPair = [KeyState.RightPairRightPosition]
      if (
        cell.state === CellState.RightPair &&
        !statesSuperiorToRightPair.includes(key.state)
      ) {
        key.state = KeyState.RightPair
        continue
      }

      if (cell.state === CellState.RightPairRightPosition) {
        key.state = KeyState.RightPairRightPosition
        continue
      }
    }
  }
}
