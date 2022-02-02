<template>
  <div class="summary">
    <h2 class="title" v-text="title"></h2>
    <p>The word was <b v-text="todaysWord"></b>.</p>
    <div class="actions">
      <button class="close" @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { todaysWord } from '../helpers/word-chooser'

export default defineComponent({
  computed: {
    title(): string {
      return this.hasWon ? 'You won!' : 'You lost.'
    },
  },
  data() {
    return {
      todaysWord,
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
  props: {
    hasWon: {
      type: Boolean,
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
</style>
