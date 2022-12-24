import Router from '@koa/router'
const router = new Router()

import getUserInfo from './service/getUserInfo.service'
router.get('/', getUserInfo)

import updateUserInfo from './service/updateUserInfo.service'
router.put('/', updateUserInfo)

import getAvatarService from './service/getAvatar.service'
router.get('/avatar', getAvatarService)

import setQQavatar from './service/setQQavatar.service'
import { jwtVerifyFactory } from '@/middlewares/jwtVerify'
router.post('/qqavatar', jwtVerifyFactory(), setQQavatar)

export default router