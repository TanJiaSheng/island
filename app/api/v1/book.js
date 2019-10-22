/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-06 11:19:13
 * @LastEditTime: 2019-10-21 15:50:57
 * @LastEditors: Please set LastEditors
 */
const KoaRouter = require('koa-router')

const { HotBook} = require('@models/hot-book')
const { Book } = require('@models/book')
const { Auth } = require('@middlewares/auth')
const { Favor } = require("@models/favor")
const { Comment } = require("@models/book-comment")
const { success } = require('@lib/helper')
const {
  PositiveIntegerValidator,
  SearchValidator,
  AddShortCommentValidator } = require('@validator')

const router = new KoaRouter({
  prefix: '/v1/book'
})

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = {
    books
  }
})

/**
 * 图书详情
 * @param id
 */
router.get('/:id/detail', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const book = new Book()
  ctx.body = await book.detail(v.get('path.id')) 
})

/**
 * 图书搜索
 * @param 
 */
router.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx)
  const result = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
  ctx.body = result
})
/**
 * 获取个人喜欢数据的数量
 * @param uid
 */

 router.get('/favor/count', new Auth().m, async ctx => {
   const count = await Book.getMyFavorBookCount(ctx.auth.uid)
   ctx.body = {
     count
   }
 })

 /**
  * @param book_id
  */

  router.get('/:book_id/favor', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
      id: 'book_id'
    })
    const favor = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'))
    ctx.body = favor
  })

  router.post('/add/short_comment', new Auth().m, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx, {
      id: 'book_id'
    })
    await Comment.addComment(v.get('body.book_id'), v.get('body.content'))
    success()
  })

  router.get('/:book_id/short_comment', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
      id: 'book_id'
    })
    
    const book_id = v.get('path.book_id')
    const comments = await Comment.getComments(book_id)
    ctx.body = {
      comments,
      book_id
    }
  })

  router.get('/hot_keyword', async ctx => {
    ctx.body = {
      'hot': [
        'Python',
        '哈利波特',
        '冰与火之歌',
        '白夜行',
        '金庸',
        '盗墓笔记'
      ]
    }
  })
module.exports = router

// 图书基础数据 服务
// 共用性 API 公开

// node.js 中间层
// 微服务
// 雏形
