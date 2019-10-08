const KoaRouter = require('koa-router')
const router = new KoaRouter()

const { PositiveIntegerValidator } = require('../../validators/validator')

router.post('/v1/:id/classic/latest', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  
  // 校验
  const v = new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id')
  ctx.body = id
  
})
module.exports = router