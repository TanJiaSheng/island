const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('@db')
const { Art } = require('./art')

class Favor extends Model {
  // 业务表
  static async like(art_id, type, uid) {
    // 1 添加记录
    // 2 classic fav_nums
    // 数据库事务
    // 数据一致性

    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if(favor) {
      throw new global.errs.LikeError()
    }
    return sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, {transaction: t})
      const art = await Art.getData(art_id, type, false)
      // increment 加
      await art.increment('fav_nums', {by: 1, transaction: t})
    })
  }

  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if(!favor) {
      throw new global.errs.DislikeError()
    }
    // Favor 表 favor 记录
    return sequelize.transaction(async t => {
      await favor.destroy({
        force: true,
        transaction: t
      })
      const art = await Art.getData(art_id, type, false)
      // decrement 减
      await art.decrement('fav_nums', {by: 1, transaction: t})
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
        where: {
            uid,
            art_id,
            type,
        }
    })
    return favor ? true : false
  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}