import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let app

export const bootstrap = () => {
  console.log(222)
  app = new Vue({
    render: (h) => h(App),
  })
}
window.a = 333
export const mount = () => {
  app.$mount('#app') 
} 
 
export const unmount = () => {
  app.$destroy()
}
