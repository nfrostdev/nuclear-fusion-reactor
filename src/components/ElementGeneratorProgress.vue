<template>
  <progress
    :value="localPercent"
    max="100"
    :class="{ maxxed: maxxed }"
  ></progress>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    percent: Number,
    maxxed: Boolean
  },
  computed: {
    localPercent() {
      return this.percent
    },
    localMaxxed() {
      return this.maxxed
    }
  }
})
</script>

<style scoped lang="scss">
progress {
  margin-top: 0.25rem;
  border-radius: 0.25rem;

  &.maxxed[value] {
    animation: maxxedAnimation infinite 0.5s linear alternate;
  }

  &[value] {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    height: 0.25rem;
    width: 95%;
    border-radius: 0.25rem;

    &::-webkit-progress-bar {
      border-radius: 0.25rem;
      background-color: rgba(darken(#f3752b, 25%), 0.25);
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
    }

    // TODO: How should this work in Firefox?
    // https://css-tricks.com/html5-progress-element/
    // Apparently Firefox offers no method of styling the background of the bar directly.
    &::-webkit-progress-value {
      border-radius: 0.25rem;
      background: linear-gradient(to bottom, #f79d5c, #f3752b, #f79d5c);
    }
  }
}

@keyframes maxxedAnimation {
  0% {
    box-shadow: 0 0 0.0625rem 0 #f79d5c;
  }

  5% {
    box-shadow: 0 0 0.25rem 0 #f79d5c;
  }

  100% {
    box-shadow: 0 0 0.0625rem 0 #f79d5c;
  }
}
</style>
