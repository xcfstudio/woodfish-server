import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
const app = new Koa()

// MIDDLEWARES
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw(err.message, 422)
    }
}))

export {app}