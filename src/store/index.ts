import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    money: 0,
    elements: [
      {
        number: 1,
        symbol: 'H',
        name: 'Hydrogen',
        weight: 1,
        color: '#fafafa',
        count: 0
      },
      {
        number: 2,
        symbol: 'He',
        name: 'Helium',
        weight: 4,
        color: '#d9ffff',
        count: 0
      },
      {
        number: 3,
        symbol: 'Li',
        name: 'Lithium',
        weight: 7,
        color: '#cc80ff',
        count: 0
      },
      {
        number: 4,
        symbol: 'Be',
        name: 'Beryllium',
        weight: 9,
        color: '#c2ff00',
        count: 0
      }
    ]
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
      state.money += element.number * element.weight * element.count
      state.elements[index].count = 0
    },
    convertElement(state, index) {
      const element = state.elements[index]
      const nextElement = state.elements[index + 1]
      if (nextElement && element.count >= nextElement.weight) {
        state.elements[index].count -= nextElement.weight
        state.elements[index + 1].count++
      }
    }
  },
  actions: {},
  modules: {}
})
