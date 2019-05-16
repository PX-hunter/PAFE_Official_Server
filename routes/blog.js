const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require("../middleware/loginCheck")

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  if (ctx.query.isadmin) {
    // 管理员界面
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('未登陆')
      return
    }
    // 查询自己的博客
    author = ctx.session.username
  }
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const val = await updateBlog(ctx.query.id, ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel("更新博客失败")
  }
})

router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const val = await delBlog(ctx.query.id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel("更新博客失败")
  }
})

module.exports = router