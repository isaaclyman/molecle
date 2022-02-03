<template>
  <div class="main">
    <div class="container">
      <div class="header constrained">
        <h1 class="cursive jumbo">Sootly</h1>
        <button class="help-toggle" @click="toggleHelp">?</button>
      </div>
    </div>
    <hr />
    <div class="container body-container">
      <div class="constrained body-container">
        <transition name="fade">
          <div v-if="!showHelp && !showSummary" class="body">
            <p>Puzzle #{{ puzzleNumber }}</p>
            <Grid :chances="chances" :gridData="gridData" ref="gridEl"></Grid>
            <div v-if="hasFinished">
              <p v-if="!hasWon">
                The word was <b>{{ todaysWord }}</b
                >.
              </p>
              <p v-if="hasWon">You won!</p>
              <div class="actions">
                <button @click="toggleSummary">Results</button>
              </div>
            </div>
            <div class="spacer"></div>
            <Keyboard :keyRows="keyRows" @letter="addLetter($event)"></Keyboard>
            <div class="half-spacer"></div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="showHelp" class="help-container">
            <Help @close="toggleHelp"></Help>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="showSummary" class="summary-container">
            <Summary
              @close="toggleSummary"
              @reset="reset"
              :hasWon="hasWon"
              :gridData="gridData"
            ></Summary>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  generateEmptyKeyRows,
  keyRows,
  syncGridStateToKeys,
} from './helpers/keyboard-helper'
import { generateEmptyState, addLetter, GridEvent } from './helpers/grid-helper'
import { wordData } from './helpers/word-chooser'
import Grid from './components/grid.vue'
import Keyboard from './components/keyboard.vue'
import Help from './components/help.vue'
import Summary from './components/summary.vue'

const chances = 7

export default defineComponent({
  name: 'App',
  components: {
    Grid,
    Keyboard,
    Help,
    Summary,
  },
  data() {
    return {
      chances,
      currentLine: 0,
      gridData: generateEmptyState(chances),
      hasFinished: false,
      hasWon: false,
      keyRows,
      puzzleNumber: wordData.puzzleNumber,
      showHelp: false,
      showSummary: false,
      todaysWord: wordData.todaysWord,
    }
  },
  methods: {
    addLetter(letter: string): void {
      if (this.hasFinished) {
        if (!this.showHelp) {
          this.showSummary = true
        }
        return
      }

      const result = addLetter(this.gridData, this.currentLine, letter)

      if (result === GridEvent.InvalidWord) {
        ;(this.$refs.gridEl as typeof Grid).invalidWord(this.currentLine)
        return
      }

      syncGridStateToKeys(this.gridData, this.keyRows)
      if (result === GridEvent.Advance) {
        this.currentLine++

        if (this.currentLine >= chances) {
          this.hasFinished = true

          setTimeout(() => {
            this.showSummary = true
          }, 1500)
        }
        return
      }

      if (result === GridEvent.Win) {
        this.hasWon = true
        this.hasFinished = true
        setTimeout(() => {
          this.showSummary = true
        }, 1500)
        return
      }
    },
    reset(): void {
      this.currentLine = 0
      this.gridData = generateEmptyState(chances)
      this.hasFinished = false
      this.hasWon = false
      this.keyRows = generateEmptyKeyRows()
      this.puzzleNumber = wordData.puzzleNumber
      this.todaysWord = wordData.todaysWord
      this.showSummary = false
    },
    toggleHelp(): void {
      this.showSummary = false
      this.showHelp = !this.showHelp
    },
    toggleSummary(): void {
      this.showHelp = false
      this.showSummary = !this.showSummary
    },
  },
})
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  text-align: center;
}
</style>

<style lang="scss" scoped>
.main {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
}

.header {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
}

.jumbo {
  font-size: 5rem;
  margin: 12px 0;
}

.help-toggle {
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  right: 18px;
}

.body-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.body {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
}

.actions {
  margin-top: 12px;
}

.spacer {
  flex: 1;
}

.half-spacer {
  flex: 0.5;
}

.help-container,
.summary-container {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

// TRANSITIONS
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
