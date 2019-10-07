const KoaRouter = require('koa-router')
const router = new KoaRouter()

const HttpException = require('../../../code/http-exception')

router.post('/v1/:id/classic/latest', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  
  if(1) {
    // 动态
    const error = new HttpException('服务器内部错误', 10001, 400)
    // error.requestUrl = `${ ctx.method } ${ ctx.path }`
    throw error
  }
  
})
module.exports = router