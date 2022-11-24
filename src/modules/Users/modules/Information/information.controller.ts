import Router from '@koa/router'
const router = new Router()

import getUserInfo from './service/getUserInfo.service'
router.get('/', getUserInfo)


router.put('/:uid')

export default router