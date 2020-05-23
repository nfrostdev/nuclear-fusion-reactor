import Vue from 'vue'
import Vuex from 'vuex'
import elements from '@/assets/elements'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    money: 0,
    elements: elements
  },
  getters: {
    money: state => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(state.money)
    }
  },
  mutations: {
    addElement(state, [index, amount]) {
      state.elements[index].count += amount
    },
    sellElement(state, index) {
      const element = state.elements[index]
      state.money += element.number * element.weight * element.count * 0.01
      state.elements[index].count = 0
    },
    convertElement(state, index) {
      const element = state.elements[index]
      const nextElement = state.elements[index + 1]
      if (nextElement && element.count >= nextElement.weight) {
        state.elements[index].count -= nextElement.weight
        state.elements[index + 1].count++
        if (!nextElement.unlocked) {
          state.elements[index + 1].unlocked = true
        }
      }
    }
  },
  actions: {},
  modules: {}
})
