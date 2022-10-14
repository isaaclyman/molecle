<template>
  <div class="help">
    <h2 class="title">Stop!</h2>
    <p>Sootly is now available as a <b>mobile app</b>.</p>
    <p>
      The app is <b>redesigned from the ground up</b> with awesome features like
      a <b>custom puzzle maker</b>, 16 earnable <b>achievements</b>, and a Stats
      page to <b>track your performance</b> over time.
    </p>
    <p>
      You can download it for iOS or Android at
      <a href="https://sootly.isaaclyman.com">sootly.isaaclyman.com.</a>
    </p>
    <div class="copyright">
      Sootly &copy; 2022 by <a href="https://isaaclyman.com">Isaac Lyman</a>.
    </div>
    <div class="actions">
      <button class="close" @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CellState } from '../helpers/grid-helper'

export default defineComponent({
  components: {},
  data() {
    return {
      CellState,
      pairBad: [
        { letter: 'P', state: CellState.None },
        { letter: 'R', state: CellState.None },
      ],
      pairOneLetter: [
        { letter: 'S', state: CellState.OneRightLetter },
        { letter: 'A', state: CellState.OneRightLetter },
      ],
      pairTwoLetters: [
        { letter: 'O', state: CellState.TwoRightLetters },
        { letter: 'Y', state: CellState.TwoRightLetters },
      ],
      pairGood: [
        { letter: 'Y', state: CellState.RightPair },
        { letter: 'L', state: CellState.RightPair },
      ],
      pairPerfect: [
        { letter: 'O', state: CellState.RightPairRightPosition },
        { letter: 'S', state: CellState.RightPairRightPosition },
      ],
      pairPerfectReverse: [
        { letter: 'S', state: CellState.RightPairRightPosition },
        { letter: 'O', state: CellState.RightPairRightPosition },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss" scoped>
.help {
  padding: 6px 18px;
}

.title {
  font-weight: 300;
}

p {
  font-weight: 400;
}

.row {
  align-items: center;
  display: flex;
  flex-direction: row;
  font-weight: 400;
  margin: 12px 0;
}

.description {
  margin-left: 12px;
  text-align: left;
}

.copyright {
  font-size: 0.8rem;
  margin: 12px 0;
}
</style>
