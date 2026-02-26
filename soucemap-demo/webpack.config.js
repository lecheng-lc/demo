const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  devtool: "nosources-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-lib.js",
    // 关键配置 ↓↓↓
    library: {
      name: "MyLib", // 浏览器全局变量
      type: "umd", // 支持 CommonJS + AMD + 浏览器
    },

    globalObject: "this", // 解决 node / 浏览器 兼容问题
  },
  //   当为cheap-module-soucemap时打开这个
  //   module: {
  //     rules: [
  //       {
  //         test: /\.css$/,
  //         use: [
  //           // style-loader：创建style标签，将js中的样式资源插入进去，添加到head中生效
  //           "style-loader",
  //           // css-loader：将css文件变成commonjs模块加载到js中，里面内容是样式字符串
  //           "css-loader",
  //         ],
  //       },
  //     ],
  //   },
};
