import Router from '@koa/router'
const router = new Router()

// EMAIL CHECK
import emailCheck from './service/email.check.service'
router.get('/email/:email', emailCheck)

// PHONE CHECK
import phoneCheck from './service/phone.check.service'
router.get('/phone/:phone', phoneCheck)

// USER NAME CHECK
import nameCheck from './service/name.check.service'
router.get('/name/:name', nameCheck)

export default router