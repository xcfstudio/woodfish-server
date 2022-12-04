import { jwtVerifyFactory } from '@/middlewares/jwtVerify'
import Router from '@koa/router'
const router = new Router()

router.use(jwtVerifyFactory())

import feedbackService from './service/feedback.service'
router.post('/issue', feedbackService)


export default router