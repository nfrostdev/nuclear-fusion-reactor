import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    money: 0
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
    }
  },
  actions: {},
  modules: {}
})
