import { redisClient } from '@/core/REDIS/Redis'
import Router from '@koa/router'
const router = new Router()

router.get('/', async (ctx, next) => {
    
    ctx.body = 'hahaha'
})

export default router