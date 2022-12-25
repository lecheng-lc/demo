
// import * as singleSpa from "single-spa"
const domElement = document.createElement('div')
// const parcelProps = { domElement, testPorps: 'try-parcel' }
// domElement.classList = ['try-parcel']
// parcel的实现
export const parcelConfig = {
  bootstrap() {
    // 初始化
    return Promise.resolve().then(() => {
      console.log('bootstrap')
    })
  },
  mount(res) {
    console.log(res)
    console.log(123)
    return new Promise((resolve) => {
      domElement.innerHTML = `mount`
      document.body.appendChild(domElement)
      resolve()
    })
  },
  unmount() {
    console.log('config')
    // 使用某个框架卸载dom，做其他的清理工作
    return Promise.resolve().then(() => {
      // domElement.innerHTML = `unmount`
    })
  }
}

// console.log(singleSpa.mountRootParcel)
// console.log(888)
// console.log(singleSpa)
// // 调用挂载
// const parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps)
// setTimeout(() => {
//   console.log(parcel.getStatus())
//   console.log('我看下什么状态')
//   parcel.unmount()
// }, 4000);

