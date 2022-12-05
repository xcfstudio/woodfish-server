import { jwtVerifyFactory } from '@/middlewares/jwtVerify'
import Router from '@koa/router'
const router = new Router()

// 敲木鱼
import knockWoodfishService from './service/knockWoodfish.service'
router.post('/knock', knockWoodfishService)

// 敲木鱼（直接上传分数)
import knockWoodfishUpScoreServie from './service/knockWoodfishUpScore.service'
router.post('/knock2', knockWoodfishUpScoreServie)

// 获取总功德值
import getScoreService from './service/getScore.service'
router.get('/score', getScoreService)

// 获取今日功德值
import getTodayScoreService from './service/getTodayScore.service'
router.get('/todayscore', getTodayScoreService)

// 获取今日功德值、总功德值、今日排名、总排名
import getBasicInfo from './service/getBasicInfo.service'
router.get('/basicinfo', getBasicInfo)

export default router