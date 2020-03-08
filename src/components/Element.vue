<template>
  <div class="element" :style="styling">
    <div class="element--number" title="Atomic Number">{{ number }}</div>
    <div class="element--count" :title="'Total ' + name + ' Available'">
      {{ count }}
    </div>
    <div class="element--symbol" title="Atomic Symbol">{{ symbol }}</div>
    <div class="element--name" title="Atomic Name">{{ name }}</div>
    <div class="element--weight" title="Atomic Weight">
      <span>{{ weight }}</span>
      <font-awesome-icon class="icon" icon="weight-hanging" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    number: Number,
    symbol: String,
    name: String,
    weight: Number,
    color: String
  },
  data() {
    return {
      count: 0,
      generating: true,
      converting: false,
      elementInterval: 0
    }
  },
  computed: {
    styling(): object {
      return {
        backgroundColor: this.color
      }
    }
  },
  mounted() {
    this.elementInterval = setInterval(() => {
      if (this.generating) {
        this.count++
      }
    }, 1000)
  }
})
</script>

<style scoped lang="scss">
.element {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 10rem;
  color: darken(#cfc0bd, 50%);
  background-color: white;
  text-align: center;
  border-radius: 0.25rem;
  margin: 1rem;
  border: 0.0625rem solid rgba(0, 0, 0, 0.25);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);

  &:after {
    content: '';
    width: 12rem;
    height: 12rem;
    pointer-events: none;
    background: radial-gradient(rgba(255, 255, 255, 0.75), transparent);
  }

  & > * {
    position: absolute;
  }

  &--number {
    top: 1rem;
    left: 1rem;
  }

  &--count {
    top: 1rem;
    right: 1rem;
  }

  &--symbol {
    font-size: 350%;
    top: 2.75rem;
  }

  &--name {
    bottom: 2.5rem;
  }

  &--weight {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 1rem;

    .icon {
      position: absolute;
      right: -0.75rem;
      margin-left: 0.125rem;
      font-size: 50%;
    }
  }
}
</style>
