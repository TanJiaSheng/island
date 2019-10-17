const Router = require('koa-router')

const { Auth } = require('@middlewares/auth')
const { LikeValidator } = require('@validator')
const { Favor } = require('@models/favor')
const { success } = require('@lib/helper')

const router = new Router({
  prefix: '/v1/like'
})

router.post('/', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  // 用户id不能显式传递，用户可能串改。 
  // 建议隐式传递
  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

/**
 * 取消点赞
 * post('/v1/like/cancel', {
 *  art_id,
 *  type,
 *  uid
 * })
 */
router.post('/cancel', new Auth().m, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
  success()
})

module.exports = router