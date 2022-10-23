import HttpException  from "./http";
export default class NotFoundException extends HttpException {
  constructor(message = '资源不存在', errCode = 40004) {
    super(errCode, message, null, 404);
  }
}