import http from '../utils/axios'
export function Login(data:any){
  return http({
    method:'post',
    url: '/api/login',
    data
  })
}
export function LoginOut(data?:any){
  return http({
    method:'post',
    url:'/api/logout',
    data
  })
}
export function permissionByCreate(data?:any,method?:string) {
  return http({
    method: method || 'get',
    url: '/api/permissionByCreate',
    data
  })
}
export function apiPermission(data?:any,method?:string){
  return http({
    method: method || 'get',
    url: '/api/permission',
    data
  })
}
export function rolePermision(data?:any,method?: string){
  console.log(data)
  return http({
    method: method||'get',
    url: '/api/permission',
    data
  })
}
export function apiAuth(data?:any){
  return http({
    method:'get',
    url: '/api/auth',
  })
}
export function apiRole(data?:any){
  return http({
    method:'get',
    url: '/api/role',
    data
  })
}
export function putApiRole(data?:any){
  console.log(data,']]]][[[[')
  return http({
    method:'put',
    url: '/api/role',
    data
  })
} 
export function deleteApiAdminUser(data?:any,method?:string){
  return http({
    method:method || 'get',
    url: `/api/adminUser/${data.id}`,
    data
  })
}
export function apiAdminUser(data?:any,method?:string,headers?:any){
  return http({
    method:method || 'get',
    url: '/api/adminUser',
    data,
    headers
  })
}
export function deleApiRole(data?:any){
  return http({
    method:'delete',
    url: '/api/role',
    data
  })
}
export function deleteApiPermisssion(data?:any) {
  return http({
    method:'delete',
    url: `/api/permission/${data.id}`,
    data
  })
}
export function roleAuth(data?:any) {
  return http({
    method:'get',
    url: '/api/roleAuth',
    data,
    params:data
  })
}
export function permissionRoutes(data?:any){
  return http({
    method:'get',
    url: '/api/permission/routes',
    data
  })
}