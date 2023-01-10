import { AppStatus } from "./enum"

export interface IAppInfo {
  name: string // 入口名字
  entry: string // 入口路径
  container: string // 入口的容器
  activeRule: string // 命中规则
}

export interface IInternalAppInfo extends IAppInfo {
  status: AppStatus
  bootstrap?: LifeCycle
  mount? : LifeCycle
  unmout? : LifeCycle
  proxy: any
}


export interface ILifeCycle {
  beforeLoad?: LifeCycle | LifeCycle[]
  mounted?: LifeCycle | LifeCycle[]
  unmounted?: LifeCycle | LifeCycle[]
}

export type LifeCycle = (app: IAppInfo) => Promise<any>

export type EventType = 'hashchange' | 'popstate'
