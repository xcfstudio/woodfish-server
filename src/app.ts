import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
const app = new Koa()

import router_api from '@/routers/api'
import onError from './middlewares/onerror'

// MIDDLEWARES
app.use(onError)
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw(err.message, 422)
    }
}))

app.use(router_api.routes())

export {app}