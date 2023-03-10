import Router from "@koa/router"
import { jwtVerifyFactory } from "@/middlewares/jwtVerify"
const router = new Router()

// LOGIN
// 登陆
import loginService from './service/login.service'
router.post('/login', loginService)

// REFRESH
// 刷新令牌
import refreshTokenService from './service/refresh.service'
router.use('/refresh',jwtVerifyFactory({tokenType: 'refresh'}))
router.post('/refresh', refreshTokenService)

// REGISTER
// 注册账号
import registerService from './service/register.service'
router.post('/register', registerService)

// FORGET
// 忘记密码
import forgetService from './service/forget.service'

router.post('/forget', forgetService)

// CHANGE PASSWORD
// 修改密码
import changePasswordService from './service/changePassword.service'
router.use('/changepassword', jwtVerifyFactory())
router.post('/changepassword', changePasswordService)

//LOGOUT
// 退出登录
import logoutService from './service/logout.service'
router.use('/logout', jwtVerifyFactory())
router.post('/logout', logoutService)

// 根据用户account获取头像
import getAvatarService from './service/getAvatar.service'
router.get('/avatar/:id', getAvatarService)

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