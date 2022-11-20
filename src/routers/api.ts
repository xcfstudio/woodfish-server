import Router from '@koa/router'
const router = new Router()
router.prefix('/api')


import users_route from '@/modules/Users/users.controller'
router.use('/users', users_route.routes())


export default router