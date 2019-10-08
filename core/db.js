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
    // create_time update_time delete_time
    timestamps: true,
    paranoid: true, // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时)
    underscored: true, // 将自动设置所有属性的字段参数为下划线命名方式
  }
})

sequelize.sync({
  force: false // 自动删除原来表，重新创建新的表
})

module.exports = {
  sequelize
}