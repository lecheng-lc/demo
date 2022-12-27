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
- app-demo1/app-demo2
```js
npm install
npm run serve
```
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
- CSS隔离得手动实现
  - 基座应用和子应用样式隔离
  - 子应用与子应用的样式隔离
- js进行隔离
- 基座应用与子应用的通信问题


<!-- https://bbs.huaweicloud.com/blogs/378395 -->