/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fake-lodash.js"
/*!****************************!*\
  !*** ./src/fake-lodash.js ***!
  \****************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// fake-lodash.js: 模拟 Lodash 开头的 UMD 环境探测逻辑
(function() {
  var _ = { version: "fake-1.0.0" };
  
  // 核心！注意这个判断，和 lodash.js 里的判断一模一样
  if (true) {
    console.log("👉 [fake-lodash] 进入了 AMD 分支！因为 define.amd =", __webpack_require__.amdO);
    // 假装我们在浏览器里，挂载到全局 global/window
    if (typeof __webpack_require__.g !== 'undefined') __webpack_require__.g._ = _;
    if (typeof window !== 'undefined') window._ = _;
  } 
  else // removed by dead control flow
{}
}).call(this);


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// index.js：单纯引入，啥都不干
__webpack_require__(/*! ./fake-lodash.js */ "./src/fake-lodash.js");

console.log("✅ 模块加载完毕！");
console.log("🔍 检查全局变量 _ 的存在情况:", typeof __webpack_require__.g._ !== 'undefined' ? '被污染了' : '干净的');

})();

/******/ })()
;