import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const storeModel = {
  namespaced: true,
  state: {
    appDemo1: 'app-demo1',
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  modules: {
    test:{
    namespaced: true,
      state: {
        test: 'test1'
      },
      mutations: {
        increment2 (state) {
          state.count++
        }
      },
      actions: {
        increment2 (context) {
          context.commit('increment2')
        }
      }
    }
  }
}
export default new Vuex.Store(storeModel)
