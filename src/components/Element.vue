<template>
  <div class="element--container">
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
        class="element--generate element--action"
        :class="{ active: generating }"
        :title="(generating ? 'Stop' : 'Start') + ' the ' + name + ' Generator'"
        @click="toggleGenerator"
      >
        <font-awesome-icon v-if="generating" icon="ban" />
        <font-awesome-icon v-else icon="bolt" />
      </div>

      <div
        class="element--sell element--action"
        :title="'Sell ' + count + ' ' + name"
        @click="sellElement"
      >
        <font-awesome-icon icon="dollar-sign" />
      </div>
    </div>
    <element-generator-progress :percent="generatorPercent" :maxxed="generatorMaxxed" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ElementGeneratorProgress from './ElementGeneratorProgress.vue'

export default Vue.extend({
  components: {
    ElementGeneratorProgress
  },
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
      generatorInterval: 0,
      generatorPercent: 0,
      generatorPercentInterval: 0,
      generatorMaxxed: false
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
      const generationTime = this.number * this.weight * 100

      this.generatorInterval = setInterval(() => {
        this.count++
      }, generationTime)

      if (generationTime / 100 > 1) {
        this.generatorPercentInterval = setInterval(() => {
          this.generatorPercent + 1 >= 100
            ? (this.generatorPercent = 0)
            : (this.generatorPercent += 1)
        }, generationTime / 100)
      } else {
        this.generatorPercent = 100
        this.generatorMaxxed = true
      }
    },
    disableGenerator() {
      clearInterval(this.generatorInterval)
      clearInterval(this.generatorPercentInterval)
      this.generatorPercent = 0
    },
    sellElement() {
      this.$store.commit('addMoney', this.number * this.weight * this.count)
      this.count = 0
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
  border-radius: 0.25rem;
  border: 0.0625rem solid rgba(0, 0, 0, 0.25);
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);

  &--container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
  }

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

  &--action {
    font-size: 75%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    border: 0.0625rem solid rgba(0, 0, 0, 0.25);
    box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.1);
  }

  &--generate {
    right: 0.5rem;
    bottom: 0.5rem;

    &.active {
      color: red;
    }
  }

  &--sell {
    left: 0.5rem;
    bottom: 0.5rem;
  }
}
</style>
