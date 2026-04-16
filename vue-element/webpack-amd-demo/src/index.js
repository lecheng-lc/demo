require('./fake-lodash.js');

console.log("模块加载完毕！");
console.log("检查全局变量 _ 的存在情况:", typeof global._ !== 'undefined' ? '被污染了' : '干净的');
