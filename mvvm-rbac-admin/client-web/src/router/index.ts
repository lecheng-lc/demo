import { createRouter, createWebHistory } from 'vue-router'
import {defineAsyncComponent} from 'vue'
import routerStore from '../store/module/router'
import { routes } from './router'
const _import = (path:string) => defineAsyncComponent(() => import(`../pages/${path}.vue`));
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  let adminUser = JSON.parse(window.sessionStorage.getItem('adminUser') as string)
  if (adminUser) {
    const routerStoreInstance = routerStore()
    if (!routerStoreInstance.hasGetRules) {
      routerStoreInstance.addRouter().then((res: any) => {
        res.push({
          path: '/:catchAll(.*)',
          name: '404',
          meta: {
            title: '404'
          },
          component: _import('404')
        })
        console.log(11111111,res)
        res.forEach((item:any) => {
          console.log(item)
          router.addRoute(item) // vue3 不在支持数组形式的添加，该用vue.addroute 单条记录
        })
        next({ ...to })
      })
        .catch((err: any) => {
          console.log(err)
          next('/login')
        })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router