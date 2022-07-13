<template>
  <div class="summary">
    <h2 class="title" v-text="title"></h2>
    <div class="results">
      <p>To share your results, screenshot this page.</p>
      <p class="attempt-summary">
        Puzzle #<span v-text="puzzleNumber"></span>:
        <span v-text="attemptSummary"></span>
      </p>
      <div class="achievements" v-if="achievements.length > 0">
        <div class="achievement-list">
          <div
            class="achievement"
            v-for="achievement in achievements"
            :key="achievement.label"
            @click="showAchievementOverlay(achievement)"
          >
            <div class="achievement-label" v-text="achievement.label"></div>
          </div>
        </div>
        <div
          class="achievement-overlay"
          :class="achievementOverlayIsShown ? 'achievement-overlay-show' : ''"
        >
          <div class="achievement-overlay-content">
            <button
              class="achievement-overlay-close"
              @click="hideAchievementOverlay()"
            >
              Hide
            </button>
            <div
              class="achievement-overlay-header"
              v-text="selectedAchievement ? selectedAchievement.label : ''"
            ></div>
            <div
              class="achievement-overlay-description"
              v-text="
                selectedAchievement ? selectedAchievement.description : ''
              "
            ></div>
          </div>
        </div>
      </div>
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
import { getPuzzleLink, setWord, wordData } from '../helpers/word-chooser'
import Pair from './pair.vue'
import { Achievement, getAchievements } from '@/helpers/achievement-helper'

export default defineComponent({
  components: {
    Pair,
  },
  computed: {
    achievements(): Achievement[] {
      return getAchievements(this.gridData as GridState, this.hasWon)
    },
    attemptSummary(): string {
      if (!this.hasWon) {
        return 'Ran out of guesses.'
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
      return getPuzzleLink(this.puzzleNumber)
    },
    title(): string {
      return this.hasWon ? 'You won!' : 'You lost.'
    },
  },
  data() {
    return {
      selectedAchievement: null as Achievement | null,
      achievementOverlayIsShown: false,
      puzzleNumber: wordData.puzzleNumber,
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    hideAchievementOverlay() {
      this.achievementOverlayIsShown = false
    },
    playRandom() {
      setWord(true)
      this.$emit('reset')
    },
    showAchievementOverlay(achievement: Achievement) {
      this.selectedAchievement = achievement
      this.achievementOverlayIsShown = true
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

.achievements {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  position: relative;
  width: 100%;
}

.achievement-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  max-width: 100%;

  &::before {
    background: linear-gradient(to left, transparent 95%, #dee2f2);
    content: '';
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &::after {
    background: linear-gradient(to right, transparent 95%, #dee2f2);
    content: '';
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
  }
}

.achievement {
  align-items: flex-start;
  background-image: url('/achievement.svg');
  background-repeat: no-repeat;
  background-size: contain;
  color: #000;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-weight: 900;
  height: 130px;
  justify-content: center;
  margin: 0 6px 6px 6px;
  min-width: 80px;
  text-transform: uppercase;
  width: 80px;
}

.achievement-label {
  align-items: center;
  color: #fff;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  height: 64px;
  justify-content: center;
  opacity: 0.9;
  padding-top: 7px;
  text-align: center;
  width: 65px;
}

.achievement-overlay {
  align-items: center;
  background-color: rgba(222, 226, 242, 0.93);
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 250ms;

  &-show {
    opacity: 1;
    pointer-events: all;
  }
}

.achievement-overlay-content {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 95%;
  min-width: 200px;
  width: 60%;
}

.achievement-overlay-close {
  align-self: flex-end;
}

.achievement-overlay-header {
  font-size: 16px;
  font-weight: bold;
  padding-top: 2px;
  text-transform: uppercase;
}

.achievement-overlay-description {
  padding-top: 6px;
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
