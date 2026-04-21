const { defineConfig } = require('@vue/cli-service')
const Components = require('unplugin-vue-components/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
      configureWebpack: {
        mode: 'production',
        plugins: [
            Components({
                resolvers: [{
                    type: "component",
                    resolve: (name) => {
                        if (name.startsWith("lazy")) {
                            const partialName = name.slice(1);
                            return {
                                importName: partialName,
                                path: "lazy-ui/packages/" + partialName.toLowerCase() + '/index.vue',
                                sideEffects: 'lazy-ui/' + partialName.toLowerCase() + '/style.css'
                            };
                        }
                    }
                }]
            })
        ]
    }
})