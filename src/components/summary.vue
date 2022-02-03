<template>
  <div class="summary">
    <h2 class="title" v-text="title"></h2>
    <div class="results">
      <p>To share your results, screenshot this page.</p>
      <p class="attempt-summary">
        Puzzle #<span v-text="puzzleNumber"></span>:
        <span v-text="attemptSummary"></span>
      </p>
      <div
        class="result-line"
        v-for="(row, $rowIndex) in modifiedGridState"
        :key="$rowIndex"
      >
        <Pair
          v-for="(pair, $pairIndex) in row"
          :key="$pairIndex"
          :isInvalid="false"
          :state="pair"
          :cellData="[
            { letter: null, state: 'maybe' },
            { letter: null, state: 'maybe' },
          ]"
        ></Pair>
      </div>
    </div>
    <div class="link">
      <div>Permalink to this puzzle:</div>
      <a :href="puzzleLink">{{ puzzleLink }}</a>
    </div>
    <div class="actions">
      <button @click="playRandom">Play a random word</button>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { GridState } from '@/helpers/grid-helper'
import { defineComponent } from 'vue'
import { setWord, wordData } from '../helpers/word-chooser'
import Pair from './pair.vue'

export default defineComponent({
  components: {
    Pair,
  },
  computed: {
    attemptSummary(): string {
      if (!this.hasWon) {
        return 'Ran out of guesses.'
      } else if (this.numberOfAttempts === 1) {
        return 'Used 1 guess. Suspicious!'
      } else {
        return `Used ${this.numberOfAttempts} guesses.`
      }
    },
    modifiedGridState(): string[][] {
      return (this.gridData as GridState)
        .map((row) =>
          row.map((cell) => cell.state).filter((_, ix) => ix % 2 === 0)
        )
        .filter((row) => row.some((state) => state !== 'none'))
    },
    numberOfAttempts(): number {
      return this.modifiedGridState.length
    },
    puzzleLink(): string {
      return `https://isaaclyman.com/sootly?puzzle=${this.puzzleNumber}`
    },
    title(): string {
      return this.hasWon ? 'You won!' : 'You lost.'
    },
  },
  data() {
    return {
      puzzleNumber: wordData.puzzleNumber,
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    playRandom() {
      setWord(true)
      this.$emit('reset')
    },
  },
  props: {
    hasWon: {
      type: Boolean,
      required: true,
    },
    gridData: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.summary {
  padding: 6px 18px;
}

.title {
  font-weight: 300;
}

.attempt-summary {
  font-weight: 500;
}

.result-line {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
}

.link {
  margin-top: 18px;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 18px;

  button {
    margin: 0 6px;
  }
}
</style>
