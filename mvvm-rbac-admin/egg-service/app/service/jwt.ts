import UID from 'uuid' 
const UUID = UID.v4
import dayjs  from 'dayjs';
import { Service } from 'egg';
import AuthException from '../exception/auth'
export default class JwtService extends Service {
  // 生成token
  async createToken (userId) {
    const now = dayjs().unix();
    console.log()
    const config = this.app.config.jwt;
    return this.app.jwt.sign({
      jti: UUID(),
      iat: now,
      nbf: now,
      exp: now + 7200,
      uid: userId,
    }, config.secret)
  }
  // 验证token
  async verifyToken (token) {
    if (!token) { // 如果token不存在就抛出异常
      throw new AuthException();
    }
    const secret = this.app.config.jwt.secret;
    try {
      await this.app.jwt.verify(token, secret);
      console.log(111111)
    } catch (e:any) { // 如果token验证失败直接抛出异常
      // 通过消息判断token是否过期
      if (e.message === 'jwt expired') {
        throw new AuthException('令牌过期', 10003);
      }
      throw new AuthException();
    }
    return true;
  } 
  // 通过token获取用户id
  async getUserIdFromToken (token) {
    try{
      console.log('88777')
      await this.verifyToken(token);
      // 解析token
      const res:any = await this.app.jwt.decode(token);
      return res.uid
    } catch(err){ 
      return err
    }
  }
};