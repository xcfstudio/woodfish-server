import { Middleware } from "koa"

const login:Middleware = async ctx => {
    interface bodyType {
        account: string
        password: string
        verifycode?: string
    }
    ctx.body = {
        code: 200,
        mesage: 'login'
    }
}

export default login