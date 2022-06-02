<template>
  <div class="help">
    <h2 class="title">Instructions</h2>
    <p>You have <b>7 tries</b> to guess a <b>6-letter word</b>.</p>
    <p>
      The word is divided into <b>3 pairs</b>. When you submit a word, 
      you'll get clues about each pair <b>independently</b>.
    </p>
    <div class="row">
      <Pair
        :isInvalid="false"
        :state="CellState.Wrong"
        :cellData="pairBad"
      ></Pair>
      <div class="description">
        This is a <b>bad pair.</b> Neither letter is in the word.
      </div>
    </div>
    <div class="row">
      <Pair
        :isInvalid="false"
        :state="CellState.OneRightLetter"
        :cellData="pairOneLetter"
      ></Pair>
      <div class="description">
        This is a <b>half pair.</b> One of these letters is in the word.
      </div>
    </div>
    <div class="row">
      <Pair
        :isInvalid="false"
        :state="CellState.TwoRightLetters"
        :cellData="pairTwoLetters"
      ></Pair>
      <div class="description">
        This is a <b>double half pair.</b> Both of these letters are in the
        word, but they're not in the same pair.
      </div>
    </div>
    <div class="row">
      <Pair
        :isInvalid="false"
        :state="CellState.RightPair"
        :cellData="pairGood"
      ></Pair>
      <div class="description">
        This is a <b>full pair.</b> Both of these letters are in the word and in
        the same pair, but not in this position.
      </div>
    </div>
    <div class="row">
      <Pair
        :isInvalid="false"
        :state="CellState.RightPairRightPosition"
        :cellData="pairPerfect"
      ></Pair>
      <div class="description">
        This is a <b>perfect pair.</b> It's a full pair in the correct position.
      </div>
    </div>
    <div class="row">
      <Pair
        :isInvalid="false"
        :state="CellState.RightPairRightPosition"
        :cellData="pairPerfectReverse"
      ></Pair>
      <div class="description">
        <b>Full pairs</b> and <b>perfect pairs</b> may be backwards! In these examples,
        the correct word was SOOTLY.
      </div>
    </div>
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
import Pair from './pair.vue'

export default defineComponent({
  components: {
    Pair,
  },
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
        { letter: 'O', state: CellState.RightPairRightPosition }
      ]
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
