// 其余不同的文件 执行
const prefixer = require("postcss-prefix-selector");
const { name } = require("./package.json");
const namespace = require("postcss-selector-namespace");
module.exports = {
  lintOnSave: false,
  configureWebpack: (config) => {
    config.module.rules.push({ parser: { system: false } });
    // 打包时移除这些通用库，配合systemjs从root加载s
    // config.output.library = ' vue'
    config.externals = ["vue", "vue-router", "vuex", "lodash", "dayjs"];
  },
  filenameHashing: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins:[
          require("postcss-selector-namespace")({namespace:'.app-demo1'})
        ]
      },
    },
  },
  filenameHashing: false,
};

/**
 *
 * 下面是我们执行vue add single-spa 命令时 修改的webpack源码
 */
// module.exports = (api, options) => {
//     options.css.extract = false;

//     const packageJsonPath = api.resolve("package.json");
//     const { name } = require(packageJsonPath);
//     if (!name) {
//       throw Error(
//         `vue-cli-plugin-single-spa: could not determine package name -- change your package json name field`
//       );
//     }

//     api.chainWebpack((webpackConfig) => {
//       webpackConfig.devServer
//         .headers({
//           "Access-Control-Allow-Origin": "*",
//         })
//         .set("disableHostCheck", true);

//       webpackConfig.optimization.delete("splitChunks");

//       webpackConfig.output.libraryTarget("umd");

//       webpackConfig.output.devtoolNamespace(name);

//       webpackConfig.set("devtool", "sourcemap");

//       webpackConfig
//         .plugin("SystemJSPublicPathWebpackPlugin")
//         .use(SystemJSPublicPathWebpackPlugin, [
//           {
//             rootDirectoryLevel: 2,
//             systemjsModuleName: name,
//           },
//         ]);

//       webpackConfig
//         .plugin("StandaloneSingleSpaPlugin")
//         .use(StandaloneSingleSpaPlugin, [
//           {
//             appOrParcelName: name,
//             disabled: process.env.STANDALONE_SINGLE_SPA !== "true",
//           },
//         ]);

//       webpackConfig.externals(["single-spa"]);
//     });
//   }
