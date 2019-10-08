const bcrypt = require('bcryptjs')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model {

}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    // 设计模式 观察者模式
    // ES6 Reflect Vue3.0
    type: Sequelize.STRING,
    set(val) {
      // 加密
      const salt = bcrypt.genSaltSync(10) // 10 位数，成本
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
   // 用户 一小程序 openid 不变 且唯一
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'users'
})

module.exports = {
  User
}