import Router from '@koa/router'
const router = new Router()

// 排行榜-日榜
import dailyRankingService from './service/dailyRanking.service'
router.get('/daily', dailyRankingService)

// 排行榜-总榜
import totalRanking from './service/totalRanking.service'
router.get('/total', totalRanking)

export default router