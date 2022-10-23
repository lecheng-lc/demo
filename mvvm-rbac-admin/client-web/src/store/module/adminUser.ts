import { Login, LoginOut } from '../../api/request'
import { defineStore } from 'pinia'
import routerStore from './router'
import { AuthorizationHeader } from '../../utils/constants'
export const adminUserStore = defineStore('admin', {
  state: () => {
    return {
      adminUser: JSON.parse(window.sessionStorage.getItem('adminUser') as string)
    }
  },
  actions: {
    SET_ADMINUSER(params: any) {
      this.adminUser = params
      if(params){
        window.localStorage.setItem(AuthorizationHeader, params.token)
      } else{
        window.localStorage.setItem(AuthorizationHeader, '')
      }
      window.sessionStorage.setItem('adminUser', JSON.stringify(this.adminUser))
    },
    login({ username, password }: { username: string, password: string }) {
      return new Promise((resolve, reject) => {
        Login({
          username,
          password
        })
          .then((res: any) => {
            this.SET_ADMINUSER(res.data.data)
            resolve(res)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    },
    logout() {
      const routerStoreInstance = routerStore()
      return new Promise((resolve, reject) => {
        LoginOut('/api/logout')
          .then((res: any) => {
            this.SET_ADMINUSER('')
            routerStoreInstance.SET_ROUTER('')
            routerStoreInstance.SET_HASGETRULES(false)
            window.sessionStorage.removeItem('adminUser')
            window.sessionStorage.removeItem('router')
            resolve(res)
          })
          .catch((err: any) => {
            reject(err)
          })
      })
    }
  }
})