const Koa = require('koa')
const parser =require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const app = new Koa()

// 应用程序对象 中间件
app.use(catchError)
app.use(parser())
InitManager.initCore(app)

app.listen(3000, () => console.log('http://localhost:3000'))