import axios,{AxiosRequestConfig,AxiosResponse} from 'axios'
import { AuthorizationHeader } from './constants'
axios.defaults.baseURL = 'http://localhost:7001'
// 添加请求拦截器
axios.interceptors.request.use(
  function (config:AxiosRequestConfig<any>) {
    // 在发送请求之前做些什么
    if(window.localStorage.getItem(AuthorizationHeader)) {
      config.headers![AuthorizationHeader] = `Bearer ${window.localStorage.getItem(AuthorizationHeader)}`
    }
    return config
  },
  function (error:any) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response:AxiosResponse<any>) {
    // 对响应数据做点什么
    console.log('响应后',response)
    if(response.data.code === 10003){
      window.localStorage.clear()
      window.location.href = '/login'
    }
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default axios
