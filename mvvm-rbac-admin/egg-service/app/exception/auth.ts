import HttpException from './http'
class AuthException extends HttpException {
  constructor(message = '令牌无效', errorCode = 10001) {
    super(errorCode, message, null, 401);
  }
} 
export default AuthException