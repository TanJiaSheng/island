/*
 * @Author: your name
 * @Date: 2019-10-05 14:52:21
 * @LastEditTime: 2019-10-21 16:23:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /f:\Project\node\isLand\island\app.js
 */
require('module-alias/register')
const path = require('path')
const Koa = require('koa')
const parser = require('koa-bodyparser')
const static = require('koa-static')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

// 应用程序对象 中间件
app.use(catchError)
app.use(parser())
InitManager.initCore(app)
app.use(static(path.join(__dirname, './static')))


app.listen(3000, () => console.log('http://localhost:3000'))