import Router from '@koa/router'
const router = new Router()

import getUserInfo from './service/getUserInfo.service'
router.get('/', getUserInfo)

import updateUserInfo from './service/updateUserInfo.service'
router.patch('/', updateUserInfo)

export default router