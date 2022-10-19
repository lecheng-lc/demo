import axios,{AxiosRequestConfig,AxiosResponse} from 'axios'
axios.defaults.baseURL = 'http://localhost:7001'
// 添加请求拦截器
axios.interceptors.request.use(
  function (config:AxiosRequestConfig<any>) {
    // 在发送请求之前做些什么
    console.log('发送前')
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
    console.log('响应后')
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default axios
