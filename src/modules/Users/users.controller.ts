import Router from "@koa/router"
const router = new Router()

// LOGIN
import loginService from './service/login.service'
router.post('/login', loginService)

// REGISTER
import registerService from './service/register.service'
router.post('/register', registerService)

// FORGET
import forgetService from './service/forget.service'
router.post('/forget', forgetService)

// EXIST CHECK
import existCheckController from './modules/ExistCheck/existcheck.controller'
router.use('/exist', existCheckController.routes())

export default router