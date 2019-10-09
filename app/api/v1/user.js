const bcrypt = require('bcryptjs')
const KoaRouter = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const { success } = require('../../../app/lib/helper')

const router = new KoaRouter( {
  prefix: '/v1/user'
})

// 注册 新增数据 put get delete

router.post('/register', async (ctx) => {
  // 校验
  const v = await new RegisterValidator().validate(ctx)
  
  // 获取数据
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }
  
  // 插入数据库
  await User.create(user)

  // 返回数据给客户端
  // throw new global.errs.Success()
  success()
})

module.exports = router