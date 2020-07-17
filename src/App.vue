<template>
  <div id="app">
    <NFRHeader/>
    <main class="elements">
      <Element v-for="(element, index) in $store.state.elements"
               :key="element.number"
               :index="index"
               :element="element"
      />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NFRHeader from './components/NFRHeader.vue'
import Element from './components/Element.vue'

export default Vue.extend({
  name: 'App',
  components: {
    NFRHeader,
    Element
  }
})
</script>

<style lang="scss">
  // https://coolors.co/ddd5d0-cfc0bd-f79d5c-f3752b-ededf4
  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Inter', sans-serif;
    background-color: #ededf4;
    font-weight: 300;
  }

  .elements {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
</style>
