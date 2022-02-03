<template>
  <div class="grid">
    <div class="line" v-for="$lineIx in chances" :key="$lineIx">
      <Pair
        v-for="$pairIx in 3"
        :key="$pairIx"
        :isInvalid="invalidLine === $lineIx - 1"
        :state="getPairState($lineIx, $pairIx)"
        :cellData="[
          getCellData($lineIx, $pairIx, 1),
          getCellData($lineIx, $pairIx, 2),
        ]"
      ></Pair>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Cell, CellState, GridState } from '../helpers/grid-helper'
import Pair from './pair.vue'

const cellNumberByPairCellIx: {
  [pairIx: number]: { [cellIx: number]: number }
} = {
  1: {
    1: 1,
    2: 2,
  },
  2: {
    1: 3,
    2: 4,
  },
  3: {
    1: 5,
    2: 6,
  },
}

export default defineComponent({
  components: {
    Pair,
  },
  data() {
    return {
      invalidLine: null as number | null,
    }
  },
  methods: {
    getCellData(lineIx: number, pairIx: number, cellIx: number): Cell {
      const row = (this.gridData as GridState)[lineIx - 1]
      if (!row) {
        return {
          letter: null,
          state: CellState.None,
        }
      }

      const cellNumber = cellNumberByPairCellIx[pairIx][cellIx]
      const cell = row[cellNumber - 1]
      if (!cell) {
        return {
          letter: null,
          state: CellState.None,
        }
      }

      return cell
    },
    getPairState(lineIx: number, pairIx: number): string {
      const cell1 = this.getCellData(lineIx, pairIx, 1)
      const cell2 = this.getCellData(lineIx, pairIx, 2)

      if (cell1.state !== cell2.state) {
        console.error(cell1)
        console.error(cell2)
        throw new Error('Pair state mismatch')
      }

      return cell1.state
    },
    invalidWord(lineIx: number): void {
      console.log('invalid word on line', lineIx)
      this.invalidLine = lineIx
      setTimeout(() => {
        this.invalidLine = null
      }, 1000)
    },
  },
  props: {
    chances: {
      type: Number,
      default: 6,
    },
    gridData: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.line {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 4px 0;
}
</style>
