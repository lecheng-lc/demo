# create-vue-microfrontends

## 项目简述

> 项目是一个 Single-spa+Vue+react 框架搭建的微前端项目,仅为一个demo

## 使用步骤

1.主应用(app-main)

```js
npm install
npm run serve
```

2.子应用
- app-demo1/app-demo2/app-demo4/app-demo5
```js
npm install
npm run serve
```

- app-demo4为打包出来的应用
- app-demo5为不使用vue-cli-plugin-single-spad的产物
  - 需要自己写load函数
  - 需要注意libraryTarget中的配置为window

- app-demo3
```js
npm install
npm run start
```
--- 

## single-spa的问题
- 侵入性大
  - 1.改造项目的webpack配置
  - 2.改造入口文件
  - 3.改造子项目
- CSS隔离得手动实现 使用postcss-selector-namespace插件进行子应用间的样式隔离
  - 基座应用和子应用样式隔离 
  - 子应用与子应用的样式隔离
- js进行隔离 
  - 手动进行隔离，详情请看
    - 1. diff方法。
    ```js
      class  sandbox{
        constructor() {
          this.cacheKey = {}
          this.cacheBeforeWindow = {}
        }
        showPage() {
          this.cacheBeforeWindow = {}
          for (const item in window) {
            this.cacheBeforeWindow[item] = window[item]
          }
          if(Object.keys(this.cacheKey)) {
            for(let key in this.cacheKey) {
              window[key] = this.cacheKey[key]
            }
          }
        }
        hidePage() {
          for(const item in window){
            if(this.cacheBeforeWindow[key] !== window[key]){
              this.cacheKey[key] = this.cacheBeforeWindow[key]
              window[key] = this.cacheBeforeWindow[key]
            }
          }
        }
      }
    ```
    - 2. proxy方法
      ```js
         class ProxySandbox {
          proxy: any
          running = false
          constructor() {
            const fakeWindow = Object.create(null)
            const proxy = new Proxy(fakeWindow, {
              set: (target:any, p:string, value: any) =>{
                if(this.running) {
                  target[p] = value
                }
                return true
              },
              get(target:any, p:string):any{
                switch(p){
                  case 'window':
                  case 'self':
                  case 'globalThis':
                    return proxy
                }
                if(!window.hasOwnProperty.call(target,p) && window.hasOwnProperty(p)){
                    // @ts-ignore
                    const value = window[p]
                    if(typeof value === 'function') return value.bind(window)
                      return value
                    }
                    return target[p]
              },
              has() {
                  return true
                }
              })
                this.proxy = proxy
              }
              active() {
                this.running = true
              }
              inactive() {
                this.running = false
              }
            }
      ```
  - 使用'single-spa-leaked-globals第三方库进行隔离
- 基座应用与子应用的通信问题
  - 使用eventbus即可
  - 使用基座应用的vuex即可
<!-- https://bbs.huaweicloud.com/blogs/378395 -->


