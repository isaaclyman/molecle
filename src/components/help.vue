<template>
  <div>
    <h2 class="title">Instructions</h2>
    <p>You have <b>7 tries</b> to guess a <b>6-letter word</b>.</p>
    <p>
      The word is divided into <b>3 pairs</b>. You'll get clues about each pair.
    </p>
    <hr />
    <div class="row"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.title {
  font-weight: 300;
}

p {
  font-weight: 300;
}
</style>
