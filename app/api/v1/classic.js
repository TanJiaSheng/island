const KoaRouter = require('koa-router')
const router = new KoaRouter()

const { HttpException, ParameterException } = require('../../../code/http-exception')

router.post('/v1/:id/classic/latest', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  
  if(1) {
    const error = new ParameterException()
    throw error
  }
  
})
module.exports = router