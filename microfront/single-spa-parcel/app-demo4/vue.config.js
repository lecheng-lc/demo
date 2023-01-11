// const prefixer = require('postcss-prefix-selector');
// const { name } = require('./package.json');
const StatsPlugin = require("stats-webpack-plugin");
module.exports = {
  lintOnSave: false,
  // configureWebpack: (config) => {
  //   // config.module.rules.push({ parser: { system: false } })
  //   config.output.library = 'yanjie'
  //   config.output.libraryTarget = 'umd'
  //   // config.externals = ['vue', 'vue-router', 'vuex', 'lodash', 'dayjs'];
  // },
  configureWebpack: {
    plugins: [
      new StatsPlugin("manifest.json", {
        chunkModules: false,
        entrypoints: true,
        source: false,
        chunks: false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/],
      }),
    ],
  },
  css: {},
};
