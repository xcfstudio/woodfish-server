import Router from "@koa/router"
const router = new Router()

// SYNC MODELS
// 同步所有模型（sequelize）
import syncModels from './service/syncmodels.service'
router.get('/syncmodels', syncModels)


export default router