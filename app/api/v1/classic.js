const KoaRouter = require('koa-router')
const router = new KoaRouter()

router.get('/v1/classic/latest', (ctx, next) => {
  ctx.body = {
    key: 'classic'
  }
})
module.exports = router