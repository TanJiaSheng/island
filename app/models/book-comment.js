/*
 * @Description: In User Settings Edit
 * @Author: jsTan
 * @Date: 2019-10-18 17:21:03
 * @LastEditTime: 2019-10-19 14:46:31
 * @LastEditors: Please set LastEditors
 */
const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('@db')

class Comment extends Model {
  
  static async getComments(bookID) {
    const comments = await Comment.findAll({
      where: {
        book_id: bookID
      }
    })
    if(!comments) {
      throw new global.errs.NotFound()
    }
    return comments
  }
  static async addComment(bookID, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookID,
        content
      }
    })
    if(!comment) {
      return await Comment.create({
        book_id: bookID,
        content,
        nums: 1
      })
    } else {
      return await comment.increment('nums', {
        by: 1
      })
    }
  }
// json 序列化
 /*  toJSON() {
    return {
      content: this.getDataValue('content'),
      nums: this.getDataValue('nums')
    }
  } */
}

Comment.init({
  content: Sequelize.STRING(50),
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  book_id: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'comment'
})

module.exports = {
  Comment
}