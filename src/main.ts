import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faWeightHanging,
  faBolt,
  faBan,
  faDollarSign,
  faAngleRight,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faWeightHanging, faBolt, faBan, faDollarSign, faAngleRight, faAngleDoubleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
