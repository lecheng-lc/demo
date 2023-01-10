import {match} from 'path-to-regexp'
import {getAppList} from './appList'
import { IInternalAppInfo } from './types'
import { AppStatus } from './enum'
import { importEntry } from 'import-html-entry'

// 获取app的状态
export const getAppListStatus = ()=>{
  const actives: IInternalAppInfo[] = []
  const unmounts: IInternalAppInfo[] = []
  const list = getAppList() as IInternalAppInfo[]

  list.forEach((app)=>{
    const isActive = match(app.activeRule, {end:false})(location.pathname)
    switch(app.status) {
      case AppStatus.NOT_LOADED: // 尚未加载
      case AppStatus.LOADING: // 正在加载中
      case AppStatus.LOADED: // 资源以被加载、
      case AppStatus.BOOTSTRAPPTING: // 应用启动
      case AppStatus.NOT_MOUNTED: // 应用卸载
        isActive && actives.push(app)
        break
      case AppStatus.MOUNTED: // 应用挂载，推到卸载的数据里面
        !isActive && unmounts.push(app)
        break
    }
  })
  return {actives, unmounts}
}

export function getCompletionBaseURL(url: string) {
  return url.startsWith('//') ? `${location.protocol}${url}` : url
}

export function getCompletionURL(src: string | null, baseURI: string) {
  if (!src) return src
  if (/^(https|http)/.test(src)) return src

  return new URL(src, getCompletionBaseURL(baseURI)).toString()
}

export const prefetch = async (app: IInternalAppInfo) => {
  requestIdleCallback(async () => {
    const { getExternalScripts, getExternalStyleSheets } = await importEntry(
      app.entry
    )
    // console.log(2222)
    requestIdleCallback(getExternalStyleSheets)
    requestIdleCallback(getExternalScripts)
  })
}
