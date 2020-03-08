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

    <div
      class="element--generate"
      :class="{ active: generating }"
      :title="(generating ? 'Stop' : 'Start') + ' the ' + name + ' Generator'"
      @click="toggleGenerator"
    >
      <font-awesome-icon v-if="generating" icon="ban" />
      <font-awesome-icon v-else icon="bolt" />
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
      generating: false,
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
  methods: {
    toggleGenerator() {
      this.generating = !this.generating
      this.generating ? this.enableGenerator() : this.disableGenerator()
    },
    enableGenerator() {
      this.elementInterval = setInterval(() => {
        this.count++
      }, 1000)
    },
    disableGenerator() {
      clearInterval(this.elementInterval)
    }
  },
  mounted() {
    if (this.generating) {
      this.enableGenerator()
    }
  },
  beforeDestroy() {
    this.disableGenerator()
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
  margin: 1rem;
  border-radius: 0.25rem;
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

  &--generate {
    font-size: 75%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    right: 0.5rem;
    bottom: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    border: 0.0625rem solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);

    &.active {
      color: red;
    }
  }
}
</style>
