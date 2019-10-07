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
  throw new Error('API Exception')
  // AOP 面向切面编程
  // 监听错误
  // 输出一段有意义的提示信息

  // Koa 中间件

  // try {
    
  // } catch (error) {
    
  // }
})
module.exports = router