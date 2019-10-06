const Koa = require('koa')
const KoaRouter = require('koa-router')
const app = new Koa()
const router = new KoaRouter()

// 应用程序对象 中间件
app.use(async ctx => {
  ctx.body = ctx.path
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})