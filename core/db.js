const Sequelize = require('sequelize')
// 导入数据配置
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 定义链接的数据库
  host,
  port,
  logging: true, // 命令行显示sql语句
  timezone: '+08:00',
  define: {

  }
})

module.exports = {
  db: sequelize
}