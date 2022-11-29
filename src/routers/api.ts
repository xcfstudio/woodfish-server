// api总路由

import Router from '@koa/router'
const router = new Router()
router.prefix('/api')


import users_route from '@/modules/Users/users.controller'
router.use('/users', users_route.routes())

import gongde_route from '@/modules/Gongde/gongde.controller'
router.use('/gongde', gongde_route.routes())

import sync_models from '@/modules/System/system.controller'
router.use('/system', sync_models.routes())

import test_models from '@/modules/Test/test.controller'
import { jwtVerifyFactory } from '@/middlewares/jwtVerify'
router.use('/test', jwtVerifyFactory())
router.use('/test', test_models.routes())


export default router