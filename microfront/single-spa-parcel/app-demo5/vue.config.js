const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:(config)=>{
    config.output.library = 'app4'
    config.output.libraryTarget = 'umd'
  }
})
