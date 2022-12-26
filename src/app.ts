import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import morgan from 'koa-morgan'
const app = new Koa()


import router_api from '@/routers/api'
import onError from './middlewares/onError'
import path from 'path'
import fs from 'fs'
import { startTask01 } from './core/TASK/index.task'

const logPath = path.resolve(__dirname, '../', 'logs', 'access.log')
const logStream = fs.createWriteStream(logPath, {flags: 'a'})

// MIDDLEWARES
app.use(onError)
// 日志记录
app.use(morgan('combined', {
    stream: logStream
}))
//跨域
app.use(cors())
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw(err.message, 422)
    }
}))

app.use(router_api.routes())

import dev_config from '../config/dev'
// 开发环境下直接运行定时任务
if (!dev_config.env.production) {
    startTask01()
}

export {app}