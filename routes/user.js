const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require("../model/resModel")
router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  console.log(123)
  const data = await login(username, password)
  if (data.username) {
    // req设置session反映在session对象中
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel("登陆失败")
})

// router.get('/session-test', async function(ctx, next) {
//   if (ctx.session.viewCount == null) {  //  注册session中间件可获取ctx.session
//     ctx.session.viewCount = 0
//   }
//   ctx.session.viewCount++
//   ctx.body = {
//     errno: 0,
//     viewCount: ctx.session.viewCount
//   }
// })

module.exports = router