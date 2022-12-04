import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
const app = new Koa()


import router_api from '@/routers/api'
import onError from './middlewares/onError'

// MIDDLEWARES
app.use(onError)
app.use(cors())
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw(err.message, 422)
    }
}))

app.use(router_api.routes())

export {app}