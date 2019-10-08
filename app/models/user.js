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
  email: Sequelize.STRING,
  password: Sequelize.STRING,
   // 用户 一小程序 openid 不变 且唯一
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'users'
})