const bcrypt = require('bcryptjs')
const KoaRouter = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

const router = new KoaRouter( {
  prefix: '/v1/user'
})

// 注册 新增数据 put get delete

router.post('/register', async (ctx) => {
  // 校验
  const v = await new RegisterValidator().validate(ctx)
  // 加密
  const salt = bcrypt.genSaltSync(10) // 10 位数，成本
  const psw = bcrypt.hashSync(v.get('body.password1'), salt)
  // 获取数据
  // v.get
  const user = {
    email: v.get('body.email'),
    password: psw,
    nickname: v.get('body.nickname')
  }
  // 插入数据库
  // SQL Model
  const r = await User.create(user)
  // 返回数据给客户端
})

module.exports = router