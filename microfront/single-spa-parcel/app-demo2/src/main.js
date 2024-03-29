import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import singleSpaVue from 'single-spa-vue';
import './main.scss'
Vue.config.productionTip = false;
const appOptions = {
  render: (h) => h(App),
  router, // 路由
  store // vuex
};
// 判断是微前端加载还是独立运行
if (!window.singleSpaNavigate) {
  new Vue(appOptions).$mount('#app');
}
const vueLifecycles = singleSpaVue({
  Vue, 
  appOptions
});
export var mountParcel
export const bootstrap =  [
  (props) => {
    mountParcel = props.mountParcel
    return Promise.resolve()
  }
];
// export const bootstrap = vueLifecycles.bootstrap

export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
