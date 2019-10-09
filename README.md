# node + Koa2 + Sequelize + Mysql实现后台API开发

## 下载依赖

```js

npm install

```

## 启动

```js

npm start

```
## 热更新

平常开发node项目，每次更改项目代码都需要重新启动项目，这严重阻碍了项目的进度。下载modemon可以解决这个问题

```js
// 全局安装（推荐）

npm install nodemon -g

// 项目安装

npm install nodemon

```

启动

- package.json中配置启动项

```json

"scripts": {
  "start": "nodemon app.js",
  "start:dev": "nodemon --inspect-br",
  "start:prod": "node app.js"
}

```

- 直接启动

```js 

nodemon app.js

```

## 路由注册

不同的分类有不同的路由，项目小的时候可以逐个引入。但是如果项目大的话，路由每一个都要在app.js文件引入就显得累赘。使用require-directory可以自动引入某文件夹下的路由

- 安装

```js

npm install require-directory

```

- 使用

```js

const requireDirectory = require('require-directory')
const Router = require('koa-router')
class InitManager {
  static initCore(app) {
    //  入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
  }
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    // 自动导入某文件下的所有模块
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      if(obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager

```

[文档链接](https://www.npmjs.com/package/require-directory)




