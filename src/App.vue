<template>
  <div class="main">
    <div class="container">
      <div class="header constrained">
        <h1 class="cursive jumbo">Sootly</h1>
        <button class="help" @click="toggleHelp">?</button>
      </div>
    </div>
    <hr />
    <div class="container body-container">
      <div class="constrained body-container">
        <transition name="fade">
          <div v-if="!showHelp" class="body">
            <Grid :chances="chances" :gridData="gridData" ref="gridEl"></Grid>
            <Keyboard :keyRows="keyRows" @letter="addLetter($event)"></Keyboard>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="showHelp" class="help-container">
            <Help></Help>
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

const chances = 7

export default defineComponent({
  name: 'App',
  components: {
    Grid,
    Keyboard,
    Help,
  },
  data() {
    return {
      chances,
      currentLine: 0,
      keyRows,
      gridData: generateEmptyState(chances),
      hasWon: false,
      showHelp: false,
    }
  },
  methods: {
    addLetter(letter: string): void {
      const result = addLetter(this.gridData, this.currentLine, letter)

      if (result === GridEvent.InvalidWord) {
        ;(this.$refs.gridEl as typeof Grid).invalidWord(this.currentLine)
        return
      }

      if (result === GridEvent.Advance) {
        this.currentLine++
        syncGridStateToKeys(this.gridData, this.keyRows)
        return
      }

      if (result === GridEvent.Win) {
        this.hasWon = true
        return
      }
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

.help {
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

.help-container {
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
