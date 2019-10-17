const KoaRouter = require('koa-router')
const router = new KoaRouter({
  prefix: '/v1/classic'
})

const { PositiveIntegerValidator, ClassicValidator } = require('@validator')
const { Auth } = require('@middlewares/auth')
const { Flow } = require('@models/flow')
const { Art }  = require('@models/art')
const { Favor } = require('@models/favor')

/**
 * 获取最新期刊
 */
router.get('/latest', new Auth().m, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.artId, flow.type)
  const userLatest = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)
  // js 动态，私有成员
  // art.dataValues.index = flow.index
  art.setDataValue('index', flow.index)
  art.setDataValue('likeStatus', userLatest)
  ctx.body = art
  // 序列化 对象 json
})

/**
 * 获取下一期期刊
 */
router.get('/:index/next', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.artId, flow.type)
  const likeNext = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('likeStatus', likeNext)
  ctx.body = art
})

/**
 * 获取下一期期刊
 */
router.get('/:index/previous', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })
  if (!flow) {
    throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.artId, flow.type)
  const likePrevious = await Favor.userLikeIt(flow.artId, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('likeStatus', likePrevious)
  ctx.body = art
})

/**
 * 获取期刊详情
 */

 router.get('/:type/:id', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = parseInt(v.get('path.type'))

  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
  let { art, like_status } = artDetail
  art.setDataValue('like_status', like_status)
  ctx.body = art
 })

/**
 * 获取当前期刊是否点赞
 */
router.get('/:type/:id/favor', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = parseInt(v.get('path.type'))

  /* const art = await Art.getData(id, type)
  if(!art) {
    throw new global.errs.NotFound()
  }
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid) */

  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
  let { art, like_status } = artDetail

  ctx.body = {
    fav_nums: art.fav_nums,
    like_status
  }
})

/**
 * 获取用户点期刊
 */
router.get('/favor', new Auth().m, async ctx => {
  const uid = ctx.auth.uid
  ctx.body = await Favor.getMyClassicFavors(uid)
})
module.exports = router