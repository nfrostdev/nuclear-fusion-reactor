<template>
  <div id="app">
    <NFRHeader />
    <main class="elements">
      <Element
        :number="1"
        symbol="H"
        name="Hydrogen"
        :weight="1"
        color="#fafafa"
      />
      <Element
        :number="2"
        symbol="He"
        name="Helium"
        :weight="4"
        color="#d9ffff"
      />
      <Element
        :number="3"
        symbol="Li"
        name="Lithium"
        :weight="7"
        color="#cc80ff"
      />
      <Element
        :number="4"
        symbol="Be"
        name="Beryllium"
        :weight="9"
        color="#c2ff00"
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
