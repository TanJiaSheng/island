/*
 * @Author: your name
 * @Date: 2019-10-17 15:09:15
 * @LastEditTime: 2019-10-21 15:09:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /f:\Project\node\isLand\island\app\models\hot-book.js
 */
const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('@db')
const { Favor } = require('./favor')

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: [
        'index'
      ]
    })

    const ids = []
    books.forEach(book => {
      ids.push(book.id)
    })

    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        },
        type: 400
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
    })
    books.forEach(book => {
      HotBook._getEachBookStatus(book, favors)
    })
    return books
  }

  static _getEachBookStatus(book, favors) {
    let count = 0
    favors.forEach(favor => {
      if(book.id === favor.art_id) {
        count = favor.get('count')
      }
    })
    book.setDataValue('fav_nums', count)
    return book
  }
}

HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
}, {
  sequelize,
  tableName: 'hot_book'
})

module.exports = {
  HotBook
}