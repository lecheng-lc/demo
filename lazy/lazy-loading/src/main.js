import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import { B } from 'lazy-ui'
import 'lazy-ui/packages/b/style.css'
Vue.use(B)
new Vue({
  render: h => h(App),
}).$mount('#app')
