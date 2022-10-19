import { createRouter, createWebHistory } from 'vue-router'
import routerStore from '../store/module/router'
import { routes } from './router'
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
          path: '*',
          name: '404',
          meta: {
            title: '404'
          },
          component: () => import('../pages/404.vue')
        })
        router.addRoute(res)
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