import Router from "@koa/router"
const router = new Router()

// SYNC MODELS
// 同步所有模型（sequelize）
import syncModels from './service/syncmodels.service'
router.get('/syncmodels', syncModels)

// 创建超级管理员账户
import createSuperAdmin from './service/createSuperAdmin.service'
router.get('/superadmin', createSuperAdmin)


export default router