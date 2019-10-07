const KoaRouter = require('koa-router')
const router = new KoaRouter()

router.post('/v1/:id/classic/latest', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  
  if(1) {
    // 动态
    const error = new Error('为什么错误')
    error.errorCode = 10001
    error.status = 400
    error.requestUrl = `${ ctx.method } ${ ctx.path }`
    throw error
  }
  
})
module.exports = router