import { jwtVerifyFactory } from '@/middlewares/jwtVerify'
import Router from '@koa/router'
const router = new Router()


import feedbackService from './service/feedback.service'
router.post('/issue',jwtVerifyFactory(),feedbackService)

import checkUpdate from './service/checkUpdate.service'
router.post('/checkupdate', checkUpdate)

export default router