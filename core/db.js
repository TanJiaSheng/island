/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 13:50:33
 * @LastEditTime: 2019-10-19 14:46:41
 * @LastEditors: Please set LastEditors
 */
const { Sequelize, Model } = require('sequelize')
const { unset, clone } = require('lodash')
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
    freeZeTableName: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['updateAt', 'deletedAt', 'createdAt']
        }
      }
    }
  }
})

// json 序列化
Model.prototype.toJSON= function() {
  // let data = this.dataValues
  let data = clone(this.dataValues)
  unset(data, 'updatedAt')
  unset(data, 'deletedAt')
  unset(data, 'createdAt')
  return data
}

sequelize.sync({
  force: false // 自动删除原来表，重新创建新的表
})

module.exports = {
  sequelize
}