const KoaRouter = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const router = new KoaRouter( {
  prefix: '/v1/user'
})

// 注册 新增数据 put get delete

router.post('/register', async (ctx) => {
  // 思维路径
  // 接收参数 LinValidator
  // email password1 password2 nickname
  const v = new RegisterValidator().validate(ctx)
  // 获取数据
  // v.get
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }
  // 数据库
  // SQL Model
  const r = await User.create(user)
})

module.exports = router