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

export default router