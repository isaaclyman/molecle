<template>
  <div class="pair" :class="[isInvalid ? 'invalid' : '', 'state-' + state]">
    <div
      class="cell"
      :class="'state-' + cellData[$cellIx - 1].state"
      v-for="$cellIx in 2"
      :key="$cellIx"
    >
      {{ cellData[$cellIx - 1].letter }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  },
  props: {
    isInvalid: {
      type: Boolean,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    cellData: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
$cell-vpadding: 0.2rem;
$cell-width: 2rem;
$wrong-color: #9e9e9e;
$sorta-color: rgba(255, 238, 0, 0.5);
$correct-color: rgba(39, 135, 65, 0.5);

.pair {
  align-items: center;
  border: 2px solid #5e5e5e;
  border-radius: 12px;
  color: black;
  display: flex;
  flex-direction: row;
  height: $cell-width;
  justify-content: center;
  margin: 0 6px;
  padding: $cell-vpadding 0;

  &.invalid {
    animation-name: invalid;
    animation-direction: alternate;
    animation-duration: 150ms;
    animation-iteration-count: 6;
    animation-timing-function: ease-out;
  }

  &.state-wrong {
    background-color: $wrong-color;
  }

  &.state-one-right-letter {
    background: linear-gradient(180deg, $sorta-color 50%, $wrong-color 50%);
  }

  &.state-two-right-letters {
    background-color: $sorta-color;
  }

  &.state-right-pair {
    background: linear-gradient(180deg, $correct-color 50%, $wrong-color 50%);
  }

  &.state-right-pair-right-position {
    background-color: $correct-color;
  }
}

@keyframes invalid {
  0% {
    border-color: #5e5e5e;
    color: black;
  }

  90% {
    border-color: #ff0000;
    color: #ff0000;
  }

  100% {
    border-color: #ff0000;
    color: #ff0000;
  }
}

.cell {
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 1.4rem;
  height: $cell-width;
  justify-content: center;
  margin: 4px 2px;
  width: $cell-width;

  .state-none {
    border-bottom: 2px solid #5e5e5e;
  }
}
</style>
