import { Middleware } from "koa";

const forget: Middleware = async ctx => {
    ctx.body = {
        code: 200,
        mesage: 'forget'
    }
}

export default forget