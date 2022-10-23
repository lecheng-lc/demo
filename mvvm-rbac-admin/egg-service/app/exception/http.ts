 class HttpException extends Error {
  code:number
  msg: string
  data:any
  httpCode: number
  constructor(code = 50000, message = '服务器异常', data = null, httpCode = 500) {
    super()
    this.code = code // 自定义状态码
    this.msg = message; // 自定义返回消息
    this.data = data // 自定义返回数据
    this.httpCode = httpCode // http状态码
  }
}
export default HttpException