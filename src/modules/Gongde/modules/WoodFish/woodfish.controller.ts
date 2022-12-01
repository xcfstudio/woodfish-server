import { jwtVerifyFactory } from '@/middlewares/jwtVerify'
import Router from '@koa/router'
const router = new Router()

import knockWoodfishService from './service/knockWoodfish.service'
router.use('/knock', jwtVerifyFactory())
router.post('/knock', knockWoodfishService)

export default router