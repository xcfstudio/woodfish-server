import { jwtVerifyFactory } from '@/middlewares/jwtVerify'
import Router from '@koa/router'
const router = new Router()

// 敲木鱼
import knockWoodfishService from './service/knockWoodfish.service'
router.post('/knock', knockWoodfishService)

// 获取总功德值
import getScoreService from './service/getScore.service'
router.get('/score', getScoreService)

// 获取今日功德值
import getTodayScoreService from './service/getTodayScore.service'
router.get('/todayscore', getTodayScoreService)

export default router