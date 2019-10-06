const KoaRouter = require('koa-router')
const router = new KoaRouter()

router.get('/v1/book/latest', (ctx, next) => {
  ctx.body = {
    key: 'book'
  }
})
module.exports = router