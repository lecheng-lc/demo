const { defineConfig } = require("@vue/cli-service");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin'); // 资源清单 协助主应用加载资源

module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/app-demo5' : 'http://localhost:8995',
  chainWebpack: (config) => {
    config.devServer.headers({ "Access-Control-Allow-Origin": "*" });
  },
  configureWebpack: (config) => {
    config.output.library = "app4";
    config.output.libraryTarget = "window";
    config.name = "app4";
    // 为生产环境修改配置
    // config.mode = "production";
    // // 将每个依赖包打包成单独的js文件
    // let optimization = {
    //   minimizer: [
    //     new UglifyPlugin({
    //       uglifyOptions: {
    //         warnings: false,
    //         compress: {
    //           drop_console: true,
    //           drop_debugger: false,
    //           pure_funcs: ["console.log"],
    //         },
    //       },
    //     }),
    //   ],
    // };
    // Object.assign(config, {
    //   optimization,
    // })
    // config.plugins.push(
    //   new WebpackManifestPlugin({
    //     fileName: 'manifest.json'
    //     // filter: function(option) {
    //     //   return option.isInitial;
    //     // }
    //   })
    // );
    // config.externals = ['vue', 'vue-router', 'vuex', 'lodash', 'dayjs'];
  }
})
