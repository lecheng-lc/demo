const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack:(config)=>{
    config.output.library = 'vue4'
    config.output.libraryTarget = 'umd'
  }
})
