import Router from "@koa/router"
const router = new Router()

// SYNC MODELS
import syncModels from './service/syncmodels.service'
router.get('/syncmodels', syncModels)


export default router