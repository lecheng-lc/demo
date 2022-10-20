import { defineAsyncComponent } from 'vue'
const _import = (path:string) => defineAsyncComponent(() => import(`../pages/${path}.vue`))
import home from '../pages/Home.vue'
// 默认路由
export const routes = [
  // addRoutes之后还有
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: _import('Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: _import('Register')
  }
]

// 动态路由
export const newAddRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      type: 2
    },
    component: home,
    children: [
      {
        path: '/role',
        name: 'role',
        meta: {
          title: '角色',
          type: 2,
          breadCrumb: [
            {
              title: '首页',
              path: '/'
            },
            {
              title: '角色',
              path: '/role'
            }
          ]
        },
        component: defineAsyncComponent(() => import(`../pages/role/index.vue`)),
        redirect: '/role/list',
        children: [
          {
            path: '/role/create',
            name: 'roleCreate',
            meta: {
              title: '创建角色',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '角色',
                  path: '/role'
                },
                {
                  title: '创建角色',
                  path: '/role/create'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/role/create.vue`)),
          },
          {
            path: '/role/list',
            name: 'roleList',
            meta: {
              title: '角色列表',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '角色',
                  path: '/role'
                },
                {
                  title: '角色列表',
                  path: '/role/list'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/role/list.vue`)),
          },
          {
            path: '/role/update',
            name: 'roleUpdate',
            meta: {
              title: '修改角色',
              type: 3,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '角色',
                  path: '/role'
                },
                {
                  title: '修改角色',
                  path: '/role/update'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/role/update.vue`)),
          },
          {
            path: '/role/delete',
            name: 'roleDelete',
            meta: {
              title: '角色删除',
              type: 3
            }
          },
          {
            path: '/role/auth',
            name: 'roleAuth',
            meta: {
              title: '角色授权',
              type: 3,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '角色',
                  path: '/role'
                },
                {
                  title: '角色授权',
                  path: '/role/auth'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/role/auth.vue`)),
          }
        ]
      },
      {
        path: '/adminUser',
        name: 'adminUser',
        meta: {
          title: '管理员',
          type: 2
        },
        component: defineAsyncComponent(() => import(`../pages/adminUser/index.vue`)),
        redirect: '/adminUser/list',
        children: [
          {
            path: '/adminUser/create',
            name: 'adminUserCreate',
            meta: {
              title: '创建管理员',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '管理员',
                  path: '/adminUser'
                },
                {
                  title: '创建管理员',
                  path: '/adminUser/create'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/adminUser/create.vue`)),
          },
          {
            path: '/adminUser/list',
            name: 'adminUserList',
            meta: {
              title: '管理员列表',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '管理员',
                  path: '/adminUser'
                },
                {
                  title: '管理员列表',
                  path: '/adminUser/list'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/adminUser/list.vue`)),
          },
          {
            path: '/adminUser/update',
            name: 'adminUserUpdate',
            meta: {
              title: '修改管理员',
              type: 3,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '管理员',
                  path: '/adminUser'
                },
                {
                  title: '修改管理员',
                  path: '/adminUser/update'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/adminUser/update.vue`)),
          },
          {
            path: '/adminUser/delete',
            name: 'adminUserDelete',
            meta: {
              title: '管理员删除',
              type: 3
            }
          }
        ]
      },
      {
        path: '/permission',
        name: 'permission',
        meta: {
          title: '路由权限',
          type: 2
        },
        component: defineAsyncComponent(() => import(`../pages/permission/index.vue`)),
        redirect: '/permission/list',
        children: [
          {
            path: '/permission/create',
            name: 'permissionCreate',
            meta: {
              title: '创建路由权限',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '路由权限',
                  path: '/permission'
                },
                {
                  title: '修改管理员',
                  path: '/permission/create'
                }
              ]
            },
          component: defineAsyncComponent(() => import(`../pages/permission/create.vue`)),
          },
          {
            path: '/permission/list',
            name: 'permissionList',
            meta: {
              title: '路由权限列表',
              type: 2,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '路由权限',
                  path: '/permission'
                },
                {
                  title: '路由权限列表',
                  path: '/permission/list'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/permission/list.vue`)),
          },
          {
            path: '/permission/update',
            name: 'permissionUpdate',
            meta: {
              title: '修改路由权限',
              type: 3,
              breadCrumb: [
                {
                  title: '首页',
                  path: '/'
                },
                {
                  title: '路由权限',
                  path: '/permission'
                },
                {
                  title: '修改路由权限',
                  path: '/permission/update'
                }
              ]
            },
            component: defineAsyncComponent(() => import(`../pages/permission/update.vue`)),
          },
          {
            path: '/permission/delete',
            name: 'permissionDelete',
            meta: {
              title: '路由权限删除',
              type: 3
            }
          }
        ]
      }
    ]
  }
]
export const doFilter = (target:any[], filter:any[]) => {
  return filter.map(e => {
    var mapped = Object.assign({}, target.find(i => i.name === e.name))
    if (e.children && mapped.children) {
      mapped.children = doFilter(mapped.children, e.children)
    }
    return mapped
  })
}
