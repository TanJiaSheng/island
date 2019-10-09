const KoaRouter = require('koa-router')
const router = new KoaRouter({
  prefix: '/v1/classic'
})

const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

router.get('/latest', new Auth().m, async (ctx, next) => {
  // const path = ctx.params
  // const query = ctx.request.query
  // const headers = ctx.request.header
  // const body = ctx.request.body
  
  // // 校验
  // const v = await new PositiveIntegerValidator().validate(ctx)
  // const id = v.get('path.id')
  // ctx.body = id
  
})
module.exports = router