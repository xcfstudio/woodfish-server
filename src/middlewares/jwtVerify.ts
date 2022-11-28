import { Failure } from "@/classes/BasicResponse.class";
import { tokenFilter } from "@/utils/tokenRedis";
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
            // 获取完整token
            const token_origrn = ctx.header.authorization?.split(' ')[1] || 'null'
            // 判断token是否在黑名单中
            const res = await tokenFilter(token_origrn)
            if (res) {
                ctx.body = new Failure('Token blocked!')
                return
            }
            // 解码base64
            const b64 = token_origrn!.split('.')[1] as string
            const jwtPayload = JSON.parse(Buffer.from(b64, 'base64').toString()) as JwtPayload
            if (jwtPayload && jwtPayload.type !== type) {
                ctx.body = new Failure('Token type error!')
                return
            }
            // console.log(ctx.header.authorization)
            await koaJwt({ secret: secretKeys.secretKey, algorithms: ['HS256'] })(ctx, next)
        } catch (error) {
            console.log(error)
            ctx.body = new Failure('Authorization error!')
        }
    }
}

export { jwtVerifyFactory }