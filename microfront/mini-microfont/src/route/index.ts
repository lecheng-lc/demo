import { EventType } from "src/types";
import { runBoostrap, runBeforeLoad,runMounted,runUnmounted } from "src/lifeCycle"
import {getAppListStatus} from '../utils'
const capturedListeners: Record<EventType, Function[]> = {
  hashchange: [],
  popstate: []
}


// 劫持history和hash相关的事件和函数
// 然后我们再劫持的方法里做一些自己的事情
// 比如说在URL发生改变的时候判断当前是否切换子应用

const originalPush = window.history.pushState
const originalReplace = window.history.replaceState

let historyEvent: PopStateEvent | null = null
let lastUrl: string | null = null

export const reroute = (url:string) =>{
  if(url !== lastUrl) {
    const { actives, unmounts } = getAppListStatus()
    Promise.all(
      unmounts
        .map(async (app) => {
          await runUnmounted(app)
        })
        .concat(
          actives.map(async (app) => {
            await runBeforeLoad(app)
            await runBoostrap(app)
            await runMounted(app)
          })
        )
    ).then(() => {
      callCapturedListeners()
    })
  }
  lastUrl = url || location.href
}
const handleUrlChange = () => {
  reroute(location.href)
}

export const hijackRoute = () => {
  window.history.pushState = (...args) => {
    originalPush.apply(window.history, args)
    historyEvent = new PopStateEvent('popstate')
    // @ts-ignore
    args[2] && reroute(args[2]) // 第三个是路由路径参数
  }
  window.history.replaceState = (...args) => {
    originalReplace.apply(window.history, args)
    historyEvent = new PopStateEvent('popstate')
    // @ts-ignore
    args[2] && reroute(args[2])
  }

  window.addEventListener('hashchange', handleUrlChange)
  window.addEventListener('popstate', handleUrlChange)

  window.addEventListener = hijackEventListener(window.addEventListener)
  window.removeEventListener = hijackEventListener(window.removeEventListener)
}

const hasListeners = (name: EventType, fn: Function) => {
  return capturedListeners[name].filter((listener) => listener === fn).length
}

/**
 * @description 对hashchange事件和history事件进行拦截
 * @param func 
 * @returns 
 */
const hijackEventListener = (func: Function): any => {
  return function (name: string, fn: Function) {
    if (name === 'hashchange' || name === 'popstate') {
      if (!hasListeners(name, fn)) {
        capturedListeners[name].push(fn)
        return
      } else { // 过滤掉相同方法的主测
        capturedListeners[name] = capturedListeners[name].filter(
          (listener) => listener !== fn
        )
      }
    }
    return func.apply(window, arguments)
  }
}

export function callCapturedListeners() {
  if (historyEvent) {
    Object.keys(capturedListeners).forEach((eventName) => {
      const listeners = capturedListeners[eventName as EventType]
      if (listeners.length) {
        listeners.forEach((listener) => {
          // @ts-ignore
          listener.call(this, historyEvent)
        })
      }
    })
    historyEvent = null
  }
}

export function cleanCapturedListeners() {
  capturedListeners['hashchange'] = []
  capturedListeners['popstate'] = []
}
