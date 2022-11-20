import Router from '@koa/router'
const router = new Router()
router.prefix('/api')


import users_route from '@/modules/Users/users.controller'
router.use('/users', users_route.routes())

import sync_models from '@/modules/System/system.controller'
router.use('/system', sync_models.routes())


export default router