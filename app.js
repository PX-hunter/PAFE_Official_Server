const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')
const requireDirectory = require('require-directory')

const app = new Koa()

const user = require('./routes/user')
const blog = require('./routes/blog')

const {REDIS_CONF} = require('./conf/db')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger: 开发环境log格式
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 日志
const ENV = process.env.NODE_ENV

if (ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {  //  combined: morgan的格式，可选
    stream: writeStream
  }))
}

// session配置
app.keys = ['woji_123$#@']  //  密钥
app.use(session({
  // cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // redis
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
// app.use(user.routes(), user.allowedMethods())
// app.use(blog.routes(), blog.allowedMethods())
// 路由动态加载：require-directory可加载文件夹下嵌套文件，也可加载单文件
const apiDirectory = `${process.cwd()}/routes`; //  拼接绝对路径
requireDirectory(module, apiDirectory, {
  visit: whenLoadModule //  加载一个单位（文件夹/文件）后回调
});
function whenLoadModule(obj) {
  if (obj instanceof Router) {
    app.use(obj.routes(), blog.allowedMethods())
  }
}

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
