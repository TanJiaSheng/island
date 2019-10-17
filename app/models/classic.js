const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('@db')


const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.STRING,
  title: Sequelize.STRING,
  type: Sequelize.STRING,
}
class Movie extends Model {

}

Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})
class Sentence extends Model {
  
}

Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})

class Music extends Model {

}

const musicFields = Object.assign({
  url: Sequelize.STRING
}, classicFields)

Music.init(musicFields, {
  sequelize,
  tableName: 'music'
})

module.exports = {
  Movie,
  Sentence,
  Music
}