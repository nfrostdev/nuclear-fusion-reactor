<template>
  <progress :value="localPercent" max="100"></progress>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    percent: Number
  },
  computed: {
    localPercent() {
      return this.percent
    }
  }
})
</script>

<style scoped lang="scss">
progress {
  margin-top: 0.125rem;

  &[value] {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    height: 0.25rem;
    width: 100%;

    &::-webkit-progress-bar {
      border-radius: 0.25rem;
      background-color: #cfc0bd;
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
    }

    // TODO: How should this work in Firefox?
    // https://css-tricks.com/html5-progress-element/
    // Apparently Firefox offers no method of styling the background of the bar directly.
    &::-webkit-progress-value {
      border-radius: 0.25rem;
      background: linear-gradient(to left, #f3752b, #f79d5c);
    }
  }
}
</style>
