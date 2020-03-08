<template>
  <header class="header">
    <h1>Nuclear Fusion Reactor</h1>
    <div class="header--description">A game about elements.</div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.header {
  padding: 2rem;
  text-align: center;
  color: darken(#cfc0bd, 50%);
  text-shadow: 0 0.125rem 0.125rem #cfc0bd;

  &--description {
    margin-top: 0.25rem;
  }
}

h1 {
  font-size: 175%;
  font-weight: 400;
}
</style>
