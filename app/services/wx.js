const util = require('util')
const axios = require('axios')
const { User } = require('@models/user')
const { generateToken } = require('@core/util')
const { Auth } = require('@middlewares/auth')
class WXManger {
  static async codeToToken(code) {
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appid,
      global.config.wx.appSecret,
      code
    )
    const result = await axios.get(url)
    if(result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    const errmsg = result.data.errmsg
    if(errcode) {
      throw new global.errs.AuthFailed('openid获取失败:' + errmsg)
    }
    // openid -> 档案 -> user -> uid -> openid
    let user = await User.getUserByOpenId(result.data.openid)
    if(!user) {
     let user = await User.registerByOpenId(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManger
}