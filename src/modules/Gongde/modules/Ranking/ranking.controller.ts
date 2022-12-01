import Router from '@koa/router'
const router = new Router()

import dailyRankingService from './service/dailyRanking.service'
router.get('/daily', dailyRankingService)

export default router