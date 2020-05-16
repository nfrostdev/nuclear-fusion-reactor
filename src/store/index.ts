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
    addMoney(state, amount) {
      state.money += amount
    },
    addElement(state, [index, amount]) {
      state.elements[index].count += amount
    }
  },
  actions: {},
  modules: {}
})
