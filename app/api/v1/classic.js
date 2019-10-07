const KoaRouter = require('koa-router')
const router = new KoaRouter()

router.post('/v1/:id/classic/latest', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  ctx.body = {
    key: 'classic',
    path,
    query,
    headers,
    body
  }
})
module.exports = router