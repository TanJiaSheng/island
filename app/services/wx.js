const util = require('util')
const axios = require('axios')
class WXManger {
  static async codeToToken(code) {
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    )
    const result = await axios.get(url)
    if(result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    if(errcode !== 0) {
      throw new global.errs.AuthFailed('openid获取失败:' + errcode)
    }
  }
}