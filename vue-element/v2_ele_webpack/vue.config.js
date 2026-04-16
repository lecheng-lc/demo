const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 告诉 Webpack：遇到 lodash 不要去模拟 AMD 环境
    config.module
      .rule('disable-amd')
      .test(/lodash\.js$/)
      .parser({ amd: false })
  }
})