const router = require('koa-router')()
const {registerUser,loginCheck} =  require('../controller/userController')

router.prefix('/api/user') // 配置路由前缀


router.post('/login', async (ctx, next) => {
    let result = await loginCheck(ctx.request.body)
    if(result.code === 200) {
        ctx.session.username = result.data.username
        ctx.session.password = result.data.password
        ctx.session.gender = result.data.gender
    }
    return ctx.body = result
})

router.post('/register', async (ctx, next) => {
    let result = await registerUser(ctx.request.body)
    return ctx.body = result
})


router.get('/test', async (ctx, next) => {
    ctx.body = ctx.session
})




module.exports = router