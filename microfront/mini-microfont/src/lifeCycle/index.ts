import { IAppInfo, IInternalAppInfo, ILifeCycle} from "src/types"
import { AppStatus } from "../enum"
import { loadHTML } from '../loader'

let lifeCycle:ILifeCycle = {}
// 设置子应用的生命周期
export const setLifeCycle = (list:ILifeCycle) =>{
  lifeCycle = list
}
// 取出子应用生命周期
export const getLifeCycle = ()=>{
  return lifeCycle
}

export const runBeforeLoad = async (app:IInternalAppInfo)=>{
  app.status = AppStatus.LOADING
  await runLifeCycle('beforeLoad', app)
  app = await loadHTML(app)
  app.status = AppStatus.LOADED // 改变资源吗
}

export const runBoostrap = async (app: IInternalAppInfo) =>{
  if(app.status !== AppStatus.LOADED) {
    return app
  }
  app.status = AppStatus.BOOTSTRAPPTING
  await app.bootstrap?.(app)
  app.status = AppStatus.NOT_MOUNTED
}

export const runMounted = async (app: IInternalAppInfo) =>{
  app.status = AppStatus.MOUNTING
  await app.mount?.(app)
  app.status = AppStatus.MOUNTED
  await runLifeCycle('mounted', app)
}

export const runUnmounted = async (app: IInternalAppInfo) =>{
  app.status = AppStatus.UNMOUNTING
  app.proxy.inactive() // 卸载window变量
  await app.unmount?.(app)
  app.status = AppStatus.NOT_MOUNTED
  await runLifeCycle('unmounted', app)
}

const runLifeCycle = async (name: keyof ILifeCycle,app : IAppInfo) =>{
  const fn = lifeCycle[name]
  if(fn instanceof Array) {
    await Promise.all(fn.map((item)=>item(app)))
  } else {
    await fn?.(app)
  }
}