const KoaRouter = require('koa-router')
const router = new KoaRouter()

router.get('/v1/book/latest', (ctx, next) => {
  ctx.body = {
    key: 'book'
  }
})

// 图书基础数据 服务
// 共用性 API 公开

// node.js 中间层
// 微服务
// 雏形

module.exports = router