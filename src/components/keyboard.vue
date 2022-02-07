<template>
  <div class="keyboard">
    <div class="row" v-for="(row, $rowIx) of keyRows" :key="$rowIx">
      <div class="ghost-key" v-if="$rowIx === 1"></div>
      <div class="key" v-for="key of row" :key="key.letter">
        <button
          @click="pressKey(key.letter, $event)"
          :class="'state-' + key.state"
          :aria-description="getAriaDescription(key)"
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
import { Key, KeyState, validateKey } from '../helpers/keyboard-helper'

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
    getAriaDescription(key: Key): string {
      switch (key.state) {
        case KeyState.None:
          return 'Not submitted'
        case KeyState.Wrong:
          return 'Wrong letter'
        case KeyState.MaybeLetter:
          return 'Maybe letter'
        case KeyState.RightLetter:
          return 'Right letter'
        case KeyState.RightPair:
          return 'Right pair'
        case KeyState.RightPairRightPosition:
          return 'Right pair right position'
      }

      return 'Unknown state'
    },
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
$contrast-color: #d8e7e9;
$wrong-color: #29252d;
$sorta-color: #b89651;
$correct-color: #447457;

.ghost-key {
  flex: 1;
}

.key {
  flex: 1;
  margin: 0 2px;

  button {
    background-color: #9d9eaa;
    border: 2px solid transparent;
    color: $wrong-color;
    flex: 1;
    font-size: 1.1rem;
    font-weight: 600;
    height: $button-size;
    min-width: calc($button-size / 2);
    padding: 0;
    touch-action: manipulation;
    transition: background-color 200ms, color 200ms, border 200ms;
    width: 100%;

    &:not(.state-none) {
      color: $contrast-color;
    }

    &.state-wrong {
      background-color: $wrong-color;
    }

    &.state-maybe {
      background: linear-gradient(180deg, $sorta-color 50%, $wrong-color 50%);
      background-origin: border-box;
      background-repeat: no-repeat;
      border-color: $wrong-color;
      border-style: dashed;
    }

    &.state-right-letter {
      background-color: $sorta-color;
      border-color: $wrong-color;
      border-style: dashed;
    }

    &.state-right-pair {
      background: linear-gradient(180deg, $correct-color 50%, $wrong-color 50%);
      background-origin: border-box;
      background-repeat: no-repeat;
    }

    &.state-right-pair-right-position {
      background-color: $correct-color;
    }
  }
}
</style>
