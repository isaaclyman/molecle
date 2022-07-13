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
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20010904//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3E%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='798.000000pt' height='1280.000000pt' viewBox='0 0 798.000000 1280.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cmetadata%3E%0ACreated by potrace 1.15, written by Peter Selinger 2001-2017.%0ALicensed under CC0 (Public Domain).%0A%3C/metadata%3E%3Cg transform='translate(0.000000,1280.000000) scale(0.100000,-0.100000)'%0Afill='%23447457' stroke='%23000000' stroke-width='20%25'%3E%3Cpath d='M3114 12546 l-249 -255 -345 60 c-190 32 -348 59 -352 59 -5 0 -80%0A-143 -167 -319 l-160 -318 -48 -7 c-232 -32 -646 -96 -651 -100 -3 -4 -29%0A-161 -57 -351 -28 -189 -53 -346 -55 -348 -3 -3 -146 -75 -317 -161 -258 -129%0A-313 -160 -313 -177 0 -11 25 -169 56 -352 l55 -332 -255 -250 -255 -250 164%0A-316 165 -315 -165 -315 -165 -314 254 -253 253 -253 -58 -342 c-33 -188 -59%0A-345 -59 -349 0 -5 144 -80 320 -168 235 -118 320 -165 320 -178 1 -48 98%0A-674 106 -681 5 -5 164 -31 353 -60 189 -28 345 -52 347 -54 1 -1 72 -145 157%0A-319 86 -175 157 -318 159 -318 2 0 41 7 87 15 47 8 87 13 89 10 2 -2 -187%0A-1114 -421 -2472 -233 -1357 -423 -2469 -423 -2470 1 -2 240 283 531 632 290%0A350 531 637 534 640 4 2 134 -344 290 -768 156 -425 287 -775 290 -779 4 -4%0A198 1104 431 2462 234 1359 427 2470 430 2470 3 0 196 -1111 430 -2470 233%0A-1358 427 -2466 431 -2462 3 4 134 354 290 779 156 424 286 770 290 768 3 -3%0A244 -290 534 -640 291 -349 530 -634 531 -632 0 1 -187 1095 -417 2432 -230%0A1337 -421 2448 -425 2469 l-6 39 43 -7 c24 -4 63 -10 86 -13 l42 -6 156 314%0Ac87 173 159 316 161 318 4 5 547 86 646 97 66 8 56 -14 88 199 69 466 79 520%0A91 524 6 2 150 72 319 156 l306 153 -59 351 -59 351 255 253 256 252 -165 314%0A-165 313 167 317 166 316 -255 250 -256 250 60 345 c32 190 59 348 59 352 0 5%0A-144 80 -320 168 -176 88 -320 166 -320 173 0 10 -30 217 -84 585 -8 51 -17%0A96 -20 99 -3 3 -153 28 -333 54 -181 27 -337 51 -348 54 -16 3 -59 82 -175%0A319 -125 254 -159 315 -175 316 -11 0 -170 -25 -354 -56 l-334 -57 -251 256%0A-251 256 -314 -164 -314 -165 -310 162 c-171 90 -314 164 -318 166 -4 2 -118%0A-112 -255 -252z'/%3E%3C/g%3E%3C/svg%3E%0A");
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
