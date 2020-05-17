<template>
  <div class="element__container" v-if="unlocked">
    <div class="element" :style="styling">
      <div class="element__number" title="Atomic Number">{{ number }}</div>
      <div class="element__count" :title="'Total ' + name + ' Available'">
        {{ count }}
      </div>
      <div class="element__symbol" title="Atomic Symbol">{{ symbol }}</div>
      <div class="element__name" title="Atomic Name">{{ name }}</div>
      <div class="element__weight" title="Atomic Weight">
        <span>{{ weight }}</span>
        <font-awesome-icon class="icon" icon="weight-hanging"/>
      </div>

      <div
        v-if="!isLastElement"
        class="element__convert element__action"
        :title="'Convert ' + name"
        @click="convertElement(index)"
        :class="{disabled: !canConvert || converting}"
      >
        <font-awesome-icon icon="angle-right"/>
      </div>

      <div
        v-if="!isLastElement"
        class="element__autoconvert element__action"
        :title="'Automatically Convert ' + name"
        :class="{ active: converting, disabled: !canConvert && !converting }"
        @click="toggleAutoConversion()"
      >
        <font-awesome-icon icon="angle-double-right"/>
      </div>

      <div
        class="element__sell element__action"
        :title="'Sell ' + count + ' ' + name"
        @click="sellElement(index)"
      >
        <font-awesome-icon icon="dollar-sign"/>
      </div>

      <div
        class="element__generate element__action"
        :class="{ active: generating }"
        :title="(generating ? 'Stop' : 'Start') + ' the ' + name + ' Generator'"
        @click="toggleGenerator"
      >
        <font-awesome-icon v-if="generating" icon="ban"/>
        <font-awesome-icon v-else icon="bolt"/>
      </div>
    </div>
    <element-generator-progress :percent="generatorPercent" :maxxed="generatorMaxxed"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ElementGeneratorProgress from './ElementGeneratorProgress.vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  components: {
    ElementGeneratorProgress
  },
  props: {
    index: Number,
    number: Number,
    symbol: String,
    name: String,
    weight: Number,
    color: String
  },
  data() {
    return {
      generating: false,
      generatorInterval: 0,
      generatorPercent: 0,
      generatorPercentInterval: 0,
      generatorMaxxed: false,
      generationTime: this.number * this.weight * 100,
      converting: false,
      convertingInterval: 0
    }
  },
  computed: {
    unlocked(): number {
      return this.$store.state.elements[this.index].unlocked
    },
    count(): number {
      return this.$store.state.elements[this.index].count
    },
    styling(): object {
      return {
        backgroundColor: this.color
      }
    },
    canConvert(): boolean {
      return this.count >= this.$store.state.elements[this.index + 1].weight
    },
    isLastElement(): boolean {
      return this.index + 1 === this.$store.state.elements.length
    }
  },
  methods: {
    ...mapMutations([
      'addElement',
      'sellElement',
      'convertElement'
    ]),
    toggleAutoConversion() {
      this.converting = !this.converting
      if (this.convertingInterval) {
        clearInterval(this.convertingInterval)
        this.convertingInterval = 0
      } else {
        this.convertingInterval = setInterval(() => {
          this.convertElement(this.index)
        }, this.generationTime)
      }
    },
    toggleGenerator() {
      this.generating = !this.generating
      this.generating ? this.enableGenerator() : this.disableGenerator()
    },
    enableGenerator() {
      this.generatorInterval = setInterval(() => {
        this.addElement([this.index, 1])
      }, this.generationTime)

      if (this.generationTime / 100 > 1) {
        this.generatorPercentInterval = setInterval(() => {
          this.generatorPercent + 1 >= 100
            ? (this.generatorPercent = 0)
            : (this.generatorPercent += 1)
        }, this.generationTime / 100)
      } else {
        this.generatorPercent = 100
        this.generatorMaxxed = true
      }
    },
    disableGenerator() {
      clearInterval(this.generatorInterval)
      clearInterval(this.generatorPercentInterval)
      this.generatorPercent = 0
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

    &__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 1rem;
    }

    &:after {
      content: '';
      width: 10rem;
      height: 10rem;
      pointer-events: none;
      background: radial-gradient(rgba(255, 255, 255, 0.75), transparent);
    }

    & > * {
      position: absolute;
    }

    &__number {
      top: 1rem;
      left: 1rem;
    }

    &__count {
      top: 1rem;
      right: 1rem;
    }

    &__symbol {
      font-size: 350%;
      top: 2.75rem;
    }

    &__name {
      bottom: 2.5rem;
    }

    &__weight {
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

    &__action {
      transition: all 0.25s ease;
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
      overflow: hidden;
    }

    &__generate {
      right: 0.5rem;
      bottom: 0.5rem;

      &.active {
        color: red;
      }
    }

    &__sell {
      left: 0.5rem;
      bottom: 0.5rem;
    }

    &__convert {
      top: 3.25rem;
      right: 0.5rem;
    }

    &__autoconvert {
      bottom: 3.25rem;
      right: 0.5rem;
      padding-left: 0.125rem;

      &.active {
        color: #888;

        &:after {
          content: '';
          position: absolute;
          left: 0.125rem;
          width: 1rem;
          height: 1rem;
          border-radius: 4rem;
          border: 0.0625rem solid transparent;
          border-top-color: #888;
          animation: spin infinite 1s linear;
        }
      }
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
