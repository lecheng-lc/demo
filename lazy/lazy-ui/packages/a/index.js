import A from './index.vue';

A.install = function(Vue) {
  Vue.component(A.name, A);
};

export {
  A
}

export default A;