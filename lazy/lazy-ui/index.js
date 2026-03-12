import A from './packages/a/index.js';
import B from './packages/b/index.js';

const components = [
    A,
    B
]

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export {
    A,
    B
}

export default {
    install
}
