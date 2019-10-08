const KoaRouter = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const router = new KoaRouter( {
  prefix: '/v1/user'
})

// 注册 新增数据 put get delete

router.post('/register', async (ctx) => {
  // 思维路径
  // 接收参数 LinValidator
  // email password1 password2 nickname
  const v = new RegisterValidator().validate(ctx)
})

module.exports = router