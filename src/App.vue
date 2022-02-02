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
            <Grid :chances="chances" :gridData="gridData" ref="gridEl"></Grid>
            <Keyboard :keyRows="keyRows" @letter="addLetter($event)"></Keyboard>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="showHelp" class="help-container">
            <Help @close="toggleHelp"></Help>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="showSummary" class="summary-container">
            <Summary @close="closeSummary" :hasWon="hasWon"></Summary>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { keyRows, syncGridStateToKeys } from './helpers/keyboard-helper'
import { generateEmptyState, addLetter, GridEvent } from './helpers/grid-helper'
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
      keyRows,
      gridData: generateEmptyState(chances),
      hasFinished: false,
      hasWon: false,
      showHelp: false,
      showSummary: false,
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
          this.showSummary = true
        }
        return
      }

      if (result === GridEvent.Win) {
        this.hasWon = true
        this.hasFinished = true
        this.showSummary = true
        return
      }
    },
    closeSummary(): void {
      this.showSummary = false
    },
    toggleHelp(): void {
      this.showHelp = !this.showHelp
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
  justify-content: space-around;
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
