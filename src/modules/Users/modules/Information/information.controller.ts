import Router from '@koa/router'
const router = new Router()

import getUserInfo from './service/getUserInfo.service'
router.get('/', getUserInfo)

import updateUserInfo from './service/updateUserInfo.service'
router.put('/', updateUserInfo)

import getAvatarService from './service/getAvatar.service'
router.get('/avatar', getAvatarService)

export default router