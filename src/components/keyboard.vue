<template>
  <div class="keyboard">
    <div class="row" v-for="(row, $rowIx) of keyRows" :key="$rowIx">
      <div class="ghost-key" v-if="$rowIx === 1"></div>
      <div class="key" v-for="key of row" :key="key.letter">
        <button
          @click="pressKey(key.letter, $event)"
          :class="'state-' + key.state"
        >
          {{ key.letter }}
        </button>
      </div>
      <div class="ghost-key" v-if="$rowIx === 1"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { validateKey } from '../helpers/keyboard-helper'

export default defineComponent({
  created() {
    document.onkeydown = (e) => {
      const key = e.key.toUpperCase()
      this.pressKey(key)
    }
  },
  data() {
    return {}
  },
  methods: {
    pressKey(key: string, event?: MouseEvent) {
      if (event) {
        event.stopPropagation()
      }

      if (key === 'DEL') {
        key = 'BACKSPACE'
      }

      if (!validateKey(key)) {
        return
      }

      this.$emit('letter', key)
    },
  },
  props: {
    keyRows: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.keyboard {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 12px 0;
  width: 100%;
}

.row {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 4px 0;
  max-width: 400px;
  width: 100%;
}

$button-size: 2.3rem;
$wrong-color: rgba(62, 62, 62, 0.75);
$contrast-color: rgba(255, 255, 255, 0.75);
$sorta-color: rgba(223, 212, 57, 0.5);
$correct-color: rgba(39, 135, 65, 0.5);

.ghost-key {
  flex: 1;
}

.key {
  flex: 1;
  margin: 0 2px;

  button {
    flex: 1;
    font-size: 1.1rem;
    font-weight: 600;
    height: $button-size;
    min-width: calc($button-size / 2);
    padding: 0;
    touch-action: manipulation;
    width: 100%;

    &.state-wrong {
      background-color: $wrong-color;
      color: $contrast-color;
    }

    &.state-maybe {
      background: linear-gradient(180deg, $sorta-color 50%, $wrong-color 50%);
    }

    &.state-right-letter {
      background-color: $sorta-color;
    }

    &.state-right-pair {
      background: linear-gradient(180deg, $correct-color 50%, $wrong-color 50%);
    }

    &.state-right-pair-right-position {
      background-color: $correct-color;
    }
  }
}
</style>
