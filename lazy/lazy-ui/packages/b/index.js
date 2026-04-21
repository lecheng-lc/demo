import B from './index.vue';

B.install = function(Vue) {
  Vue.component(B.name, B);
};

export {
  B
}

export default B;
