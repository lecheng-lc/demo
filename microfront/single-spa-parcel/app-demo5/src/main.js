import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import singleSpaVue from "single-spa-vue";
import singleSpaLeakedGlobals from 'single-spa-leaked-globals';
Vue.config.productionTip = false;
const appOptions = {
  render: (h) => h(App),
  router,
  store,
};
// 判断是微前端加载还是独立运行
if (!window.singleSpaNavigate) {
  new Vue(appOptions).$mount("#app");
}
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions,
});

const leakedGlobalsLifecycles = singleSpaLeakedGlobals({
  globalVariableNames: ['bbb'], // 新添加的全局变量
})
export var mountParcel;
export const bootstrap = [
  leakedGlobalsLifecycles.bootstrap,
  (props) => {
    mountParcel = props.mountParcel;
    return Promise.resolve();
  },
];
export const mount = [
  leakedGlobalsLifecycles.mount,
  () => {
    return Promise.resolve();
  },
  vueLifecycles.mount
];
export const unmount = [
  leakedGlobalsLifecycles.unmount,
  () => {
    return Promise.resolve()
  },
  vueLifecycles.unmount,
]
