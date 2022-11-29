import Router from '@koa/router'
const router = new Router()

import knockWoodfishService from './service/knockWoodfish.service'
router.post('/', knockWoodfishService)

export default router