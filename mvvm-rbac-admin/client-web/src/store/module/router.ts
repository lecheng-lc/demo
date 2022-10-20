import { newAddRoutes, doFilter } from '../../router/router'
import { defineStore } from 'pinia';
import { adminUserStore } from './adminUser'
import {rolePermision,permissionRoutes} from '../../api/request'
export default defineStore('router',{
  state:()=>{
    return {
      router: JSON.parse(window.sessionStorage.getItem('router') as string),
      hasGetRules: false,
      permissionArr: JSON.parse(window.sessionStorage.getItem('permissionArr') as string)
    }
  },
  actions:{
    SET_ROUTER (params:any) {
      this.router = params
      window.sessionStorage.setItem('router', JSON.stringify(this.router))
      this.hasGetRules = true
    },
    SET_HASGETRULES (params:any) {
      this.hasGetRules = params
    },
    SET_PERMISSION (params:any) {
      this.permissionArr = params
      window.sessionStorage.setItem('permissionArr', JSON.stringify(this.permissionArr))
    },
    addRouter () {
      const adminStore = adminUserStore()
      let userId =  adminStore.adminUser.id
      console.log(userId,'------')
      return new Promise((resolve, reject) => {
        rolePermision( {
          userId
        })
          .then(res => {
            let rules = res.data.data
            let newRouter = doFilter(newAddRoutes, rules)
            console.log(newRouter,'哈哈',rules)
            this.SET_ROUTER(newRouter)
            resolve(newRouter)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    removeRoutes () {
      return new Promise((resolve, reject) => {
        permissionRoutes().then(res=>{
          this.SET_ROUTER('')
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})