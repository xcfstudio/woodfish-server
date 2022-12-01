import { jwtVerifyFactory } from '@/middlewares/jwtVerify'
import Router from '@koa/router'
const router = new Router()

// 木鱼系统模块
import woodfishController from './modules/WoodFish/woodfish.controller'
router.use('/woodfish', jwtVerifyFactory())
router.use('/woodfish', woodfishController.routes())

// 排行榜模块
import rankingController from './modules/Ranking/ranking.controller'
router.use('/ranking', rankingController.routes())

export default  router