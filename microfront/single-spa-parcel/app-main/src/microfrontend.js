import { registerApplication, start,setBootstrapMaxTime } from 'single-spa';
/**
 *
 * 获取子项目app.js文件
 */
function getApplication(path) {
  return window.System.import(`${path}?time=${new Date().getTime()}`).then((res) => {
    if (res.default) {
      return window.System.import(res.default['app.js']).then((res) => res.default);
    }
  });
}
// 远程加载子应用
function createScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

// 记载函数，返回一个 promise
function loadApp(url, globalVar) {
  // 支持远程加载子应用
  return new Promise(async (resolve)=>{
      await createScript(url + '/js/chunk-vendors.js')
      await createScript(url + '/js/app.js')
      resolve(window[globalVar])
      return window[globalVar]
  }) 
}

/**
 * name: 第一个参数表示应用名称，name必须是string类型
 *
 * app:  加载函数  可以是一个Promise类型的 加载函数，返回的Promise resolve之后的结果必须是一个可以被解析的应用，
 * 这个应用其实是一个包含single-spa各个生命周期函数 的对象(e.g: vue打包 引入后的app.js)。
 *
 * activeWhen: 激活函数 一个纯函数  window.loaction作为第一个参数被调用，只有函数返回的值为true时，应用才会被激活。
 * 通常情况下，activity function会根据 window.location 的path来决定是否需要被激活(我就是这样玩的)
 *
 * single-spa根据顶级路由查找应用，而每个应用会处理自身的子路由。以下场景，single-spa会调用应用的activity funtion
 * 1.hashchange or popstate 事件触发时(vue-router hash或history路由模式都会触发)
 * 2.pushState or replaceState被调用时
 * 3.在single-spa 手动调用 triggerAppChange 方法
 * 4.checkActivityFunctions 方法被调用时
 *
 * customProps
 * 对象 可以表示自定义字段，子应用生命周期函数可以获取
 * 函数 两个参数 应用的名称和window.location
 */
const development = process.env.NODE_ENV === 'development';
const baseUrl = process.env.VUE_APP_WEB_URL;
setBootstrapMaxTime(10);
const configProject = [
  {
    name: 'app1',
    app: ()=> window.System.import('app-demo1').then((res) => {
      return res.default
    }),
    activeWhen: (location) => location.pathname.startsWith('/app1'),
    customProps: (name, location) => {
     return {everything: 'just do it'};
    }
  },
  // 通过manifest去加载资源
  {
    name: 'app2',
    app:()=> getApplication(development ? 'http://localhost:8993/manifest.json' : `${baseUrl}/app2/manifest.json`),
    activeWhen: (location) => location.pathname.startsWith('/app2'),
    customProps: {
      everything: 'just do it'
    }
  },
  {
    name: 'app3',
    app: ()=> window.System.import('app-demo4').then((res) => {
      console.log(res)
      return res.default
    }),
    activeWhen: (location) => location.pathname.startsWith('/app3'),
    customProps: {
      everything: 'just do it'
    }
  },
  // 通过loadApp函数进行资源加载
  {
    name: 'app4',
    // app: ()=> window.System.import('app-demo5').then((res) => {
    //   return res.default
    // }), // 会报错
    app: loadApp('http://localhost:8995', 'app4'),
    activeWhen: (location) => location.pathname.startsWith('/app4'),
    customProps: {
      // 对象
      everything: 'just do it'
    }
  }
];

/// 注册子应用
configProject.forEach((element) => {
  registerApplication(element);
});
export function appStart() {
  // 在调用 start 之前, 应用会被加载, 但不会初始化，挂载或卸载。暴露出这个方法是可以控制子应用的激活时机，优化项目性能。
  // 比如我们一般需要登录成功之后，才会去加载子项目
  return start();
}
