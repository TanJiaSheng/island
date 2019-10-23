/*
 * @Author: your name
 * @Date: 2019-10-08 11:21:03
 * @LastEditTime: 2019-10-23 16:50:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \island\config\config.js
 */
module.exports = {
  // prod
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
  },
  security: {
    secretKey: "abcdefgvhndfjkvndfvndfjkvnsdfkslnsdikvldnsa",
    expiresIn: 60*60*24*30
  },
  wx: {
    appid: 'wx63e8c06a0f091a02',
    appSecret: 'b0fe95200a316a28ac7b010ddb06bf74',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu:{
    detailUrl:'http://t.yushu.im/v2/book/id/%s',
    keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host:'http://www.choant.com/'
}