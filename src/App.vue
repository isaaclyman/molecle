<template>
  <div>
    <div class="container">
      <div class="header constrained">
        <h1 class="cursive jumbo">Sootly</h1>
        <button class="help">?</button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { todaysWord } from './helpers/word-chooser'

export default defineComponent({
  name: 'App',
  components: {},
  mounted() {
    console.log(todaysWord)
  },
})
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style lang="scss" scoped>
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
</style>
