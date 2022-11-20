import { Middleware } from "koa";

const register: Middleware = async ctx => {
    ctx.body = {
        code: 200,
        mesage: 'register'
    }
}

export default register