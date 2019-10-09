const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor() {

  }
  get m () {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if(!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        // token 不合法
        // token 过期
        if(error.name == 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new global.errs.Forbbiden(errMsg)
      }
      // token检测
      // token 开发者 传递令牌
      // token body header 约定
      // HTTP 规定 身份验证机制 HttpBasicAuth

    }
  }
}

module.exports = {
  Auth
}