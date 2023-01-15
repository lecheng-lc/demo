import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    aa() {}
  },
  modules: {
  }
})

window.rootStore = store
export default store