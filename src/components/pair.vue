<template>
  <div
    class="pair"
    :class="[isInvalid ? 'invalid' : '', 'state-' + state]"
    :aria-description="ariaDescription"
  >
    <div
      class="cell"
      :class="'state-' + cellData[$cellIx - 1].state"
      v-for="$cellIx in 2"
      :key="$cellIx"
    >
      {{ cellData[$cellIx - 1].letter }}
    </div>
  </div>
</template>

<script lang="ts">
import { Cell, CellState } from '@/helpers/grid-helper'
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    ariaDescription(): string {
      const cell = this.cellData[0] as Cell
      switch (cell.state) {
        case CellState.None:
          return 'Not submitted'
        case CellState.Wrong:
          return 'Bad pair'
        case CellState.OneRightLetter:
          return 'Half pair'
        case CellState.TwoRightLetters:
          return 'Double half pair'
        case CellState.RightPair:
          return 'Full pair'
        case CellState.RightPairRightPosition:
          return 'Perfect pair'
      }

      return 'Unknown state'
    },
  },
  data() {
    return {}
  },
  props: {
    isInvalid: {
      type: Boolean,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    cellData: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
$cell-vpadding: 0.2rem;
$cell-width: 2rem;
$contrast-color: #d8e7e9;
$wrong-color: #29252d;
$sorta-color: #b89651;
$correct-color: #447457;

.pair {
  align-items: center;
  border: 2px solid #5e5e5e;
  border-radius: 12px;
  color: #29252d;
  display: flex;
  flex-direction: row;
  height: $cell-width;
  justify-content: center;
  margin: 0 6px;
  padding: $cell-vpadding 0;
  transition: background-color 200ms, color 200ms, border 200ms;

  &.invalid {
    animation-name: invalid;
    animation-direction: alternate;
    animation-duration: 150ms;
    animation-iteration-count: 6;
    animation-timing-function: ease-out;
  }

  &:not(.state-none) {
    color: $contrast-color;
  }

  &.state-wrong {
    background-color: $wrong-color;
  }

  &.state-one-right-letter {
    background: linear-gradient(180deg, $sorta-color 50%, $wrong-color 50%);
    background-origin: border-box;
    background-repeat: no-repeat;
    border-color: $wrong-color;
    border-style: dashed;
  }

  &.state-two-right-letters {
    background-color: $sorta-color;
    border-color: $wrong-color;
    border-style: dashed;
  }

  &.state-right-pair {
    background: linear-gradient(180deg, $correct-color 50%, $wrong-color 50%);
    border-color: $wrong-color;
  }

  &.state-right-pair-right-position {
    background-color: $correct-color;
    border-color: $wrong-color;
  }
}

@keyframes invalid {
  0% {
    border-color: #5e5e5e;
    color: black;
  }

  90% {
    border-color: #ff0000;
    color: #ff0000;
  }

  100% {
    border-color: #ff0000;
    color: #ff0000;
  }
}

.cell {
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 1.4rem;
  height: $cell-width;
  justify-content: center;
  margin: 4px 2px;
  width: $cell-width;

  .state-none {
    border-bottom: 2px solid #5e5e5e;
  }
}
</style>
