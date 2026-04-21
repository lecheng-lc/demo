// fake-lodash.js: 模拟 Lodash 开头的 UMD 环境探测逻辑
(function() {
  var _ = { version: "fake-1.0.0" };
  
  // 核心！注意这个判断，和 lodash.js 里的判断一模一样
  if (typeof define === 'function' && define.amd) {
    console.log("👉 [fake-lodash] 进入了 AMD 分支！因为 define.amd =", define.amd);
    // 假装我们在浏览器里，挂载到全局 global/window
    if (typeof global !== 'undefined') global._ = _;
    if (typeof window !== 'undefined') window._ = _;
  } 
  else if (typeof module === 'object' && module.exports) {
    console.log("👉 [fake-lodash] 进入了 CommonJS 分支！");
    module.exports = _;
  } 
  else {
    console.log("👉 [fake-lodash] 进入了纯全局挂载分支！");
    if (typeof global !== 'undefined') global._ = _;
    if (typeof window !== 'undefined') window._ = _;
  }
}).call(this);
