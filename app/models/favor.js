/*
 * @Description: In User Settings Edit
 * @Author: jsTan
 * @Date: 2019-10-14 10:21:05
 * @LastEditTime: 2019-10-18 15:38:57
 * @LastEditors: Please set LastEditors
 */
const { Sequelize, Model, Op } = require('sequelize')
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

  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          // !=
          [Op.not]: 400
        }
      }
    })
    if(!arts) {
      throw new global.errs.NotFound()
    }
    return await Art.getList(arts)
  }

  static async getBookFavor(uid, bookID) {
    const favorNums = await Favor.count({
      where: {
        art_id: bookID,
        type: 400
      }
    })
    const myFavor = await Favor.findOne({
      art_id: bookID,
      uid,
      type: 400
    })

    return {
      fav_nums: favorNums,
      like_status: myFavor ? 1 : 0
    }
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