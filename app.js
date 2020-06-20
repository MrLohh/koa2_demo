const Koa = require('koa')  // 导入Koa
const app = new Koa() // 创建服务端实例
const views = require('koa-views') // 导入动态资源处理中间件
const json = require('koa-json')  // 导入输出json格式的包(输出json到页面上有格式 相当于浏览器json-handle插件)
const onerror = require('koa-onerror') // 导入错误处理的包
const bodyparser = require('koa-bodyparser') // 导入处理post请求参数的包
// const logger = require('koa-logger') // 导入了记录日志的包
const logger = require('koa-morgan')
const fs = require('fs')
const path = require('path')
require('./db/sync')

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const {REDIS_CONFIG} = require('./config/db')
// 导入路由
const user = require('./routes/user')

// error handler
onerror(app)  // 捕获整个服务端实例的错误

// 注册处理post参数的中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

// 注册了记录日志的中间件
// app.use(logger())
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'),{flags: 'a'})
app.use(logger('combined', {
  stream: accessLogStream
}))

// 注册处理静态资源的中间件
app.use(require('koa-static')(__dirname + '/public'))

// 注册处理动态资源的中间件
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 记录日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 配置保存登录状态的中间件
app.keys = ['Jwl.666@*'] // 用于生成一个无关紧要的id
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}))

// 启用路由
app.use(user.routes(), user.allowedMethods())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
