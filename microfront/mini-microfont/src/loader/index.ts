import { IInternalAppInfo } from '../types'
import { importEntry } from 'import-html-entry'
import { ProxySandbox } from './sandbox'

export const loadHTML = async (app: IInternalAppInfo) => {
  const { container, entry } = app

  const { template, getExternalScripts, getExternalStyleSheets } =
    await importEntry(entry) // html 、 js 、 css
  const dom = document.querySelector(container) // 查询
  if (!dom) {
    throw new Error('容器不存在')
  }
  dom.innerHTML = template
  await getExternalStyleSheets()
  const jsCode = await getExternalScripts()
  jsCode.forEach((script) => {
    const lifeCycle = runJS(script, app) //
    if (lifeCycle) { // 在这里塞的，每一个应用都有lifeCicle的值
      app.bootstrap = lifeCycle.bootstrap
      app.mount = lifeCycle.mount
      app.unmount = lifeCycle.unmount
    }
  })

  return app
}

const runJS = (value: string, app: IInternalAppInfo) => {
  if (!app.proxy) {
    app.proxy = new ProxySandbox() // 进行JS拦截
    // @ts-ignore
    window.__CURRENT_PROXY__ = app.proxy.proxy
    console.log(app.proxy.proxy)
    console.error(123456)
    console.log(value)
  }
  // @ts-ignore
  app.proxy.active()
  const code = `
    return (window => {
      ${value}
      return window['${app.name}']
    })(window.__CURRENT_PROXY__)
  `
  return new Function(code)()
}
