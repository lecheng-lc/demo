// const prefixer = require('postcss-prefix-selector');
// const { name } = require('./package.json');
module.exports = {
  lintOnSave:false,
  configureWebpack: (config) => {
    // config.module.rules.push({ parser: { system: false } })
    // config.output.library = 'yanjie'
    // config.output.libraryTarget = 'umd'
    config.externals = ['vue', 'vue-router', 'vuex', 'lodash', 'dayjs'];
  },
  filenameHashing: false,
  css: {
  },
}