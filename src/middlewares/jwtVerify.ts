import { Failure } from "@/classes/BasicResponse.class";
import { security_config } from "config/security";
import { Middleware } from "koa";
import koaJwt from 'koa-jwt'
import { secretKeys } from "secretkey/secret";

interface JwtPayload {
    uid: string
    username: string
    status: string
    type: string
}


interface JwtVerifyFactoryOptions {
    tokenType: 'access' | 'refresh'
}

/**
 * jwt校验工厂函数，返回jwt校验中间件
 * @param options 
 * @returns 
 */
const jwtVerifyFactory = (options?: JwtVerifyFactoryOptions): Middleware => {
    const type = options && options.tokenType ? options.tokenType : 'access'
    return async (ctx, next) => {
        try {
            const b64 = ctx.header.authorization?.split(' ')[1].split('.')[1] as string
            const jwtPayload = JSON.parse(Buffer.from(b64, 'base64').toString()) as JwtPayload
            if (jwtPayload && jwtPayload.type !== type) {
                ctx.body = new Failure('Token type error!')
                return
            }
            // console.log(ctx.header.authorization)
            await koaJwt({ secret: secretKeys.secretKey, algorithms: ['HS256'] })(ctx, next)
        } catch (error) {
            // console.log(error)
            ctx.body = new Failure('Authorization error!')
        }
    }
}

export { jwtVerifyFactory }