import Router from "@koa/router"
import { jwtVerifyFactory } from "@/middlewares/jwtVerify"
const router = new Router()

// LOGIN
// 登陆
import loginService from './service/login.service'
router.post('/login', loginService)

// REFRESH
// 刷新令牌
import refreshToken from './service/refresh.service'
router.use('/refresh',jwtVerifyFactory({tokenType: 'refresh'}))
router.post('/refresh', refreshToken)

// REGISTER
// 注册账号
import registerService from './service/register.service'
router.post('/register', registerService)

// FORGET
// 忘记密码
import forgetService from './service/forget.service'
router.post('/forget', forgetService)

// @Module
// EXIST CHECK
// 核查手机号、邮箱等是否已经被注册
import existCheckController from './modules/ExistCheck/existcheck.controller'
router.use('/exist', existCheckController.routes())

// @Module
// GET USER INFO
// 获取用户基本信息
import information from './modules/Information/information.controller'
router.use('/information', jwtVerifyFactory())
router.use('/information', information.routes())

export default router