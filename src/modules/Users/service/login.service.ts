import { Middleware } from "koa"

const login:Middleware = async ctx => {
    ctx.body = {
        code: 200,
        mesage: 'login'
    }
}

export default login