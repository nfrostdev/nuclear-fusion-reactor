<template>
  <header class="header">
    <h1>Nuclear Fusion Reactor</h1>
    <div class="header__description">A game about elements.</div>
    <div class="player__money">{{ $store.getters.money }}</div>
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

  &__description {
    margin-top: 0.25rem;
  }
}

h1 {
  font-size: 175%;
  font-weight: 400;
}

.player {
  &__money {
    margin-top: 2rem;
    font-size: 150%;
  }
}
</style>
