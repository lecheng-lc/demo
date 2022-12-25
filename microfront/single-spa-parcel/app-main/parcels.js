
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
