import { Failure } from "@/classes/BasicResponse.class";
import { UserAccount } from "@/models/UserAccount";
import { sha256BasedCrypt } from "@/utils/hash";
import { tokenFilter } from "@/modules/Users/utils/tokenRedis";
import { Middleware } from "koa";
import koaJwt from 'koa-jwt'
import { secretKeys } from "secretkey/secret";

interface JwtPayload {
    uid: string
    username: string
    status: string
    type: string
    secret: string
    admin?: string
}


interface JwtVerifyFactoryOptions {
    tokenType: 'access' | 'refresh',
    admin? : string
}

/**
 * jwt校验工厂函数，返回jwt校验中间件
 * @param options 
 * @returns 
 */
const jwtVerifyFactory = (options?: JwtVerifyFactoryOptions): Middleware => {
    const type = options && options.tokenType ? options.tokenType : 'access'
    const isAdmin = options && options.admin
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

            // 验证密码是否被修改(仅验证refresh token)
            if (jwtPayload.type === 'refresh') {
                const secret = jwtPayload.secret
                const u_pwd = await UserAccount.findOne({
                    attributes: ['password'],
                    where: {
                        uid: jwtPayload.uid
                    }
                })
                const hash_pwd = sha256BasedCrypt(u_pwd?.toJSON().password)
                if (secret !== hash_pwd) {
                    ctx.body = new Failure('Password changed, please login!')
                    return
                }
            }

            // 验证token类型
            if (jwtPayload && jwtPayload.type !== type) {
                ctx.body = new Failure('Token type error!')
                return
            }

            // 验证admin字段
            if (options?.admin === 'super') {
                if (jwtPayload.admin !== 'super') {
                    ctx.body = new Failure('Permission denied!')
                    return
                }
            }
            if (options?.admin === 'normal') {
                if ((jwtPayload.admin !== 'super')&&(jwtPayload.admin !== 'normal')) {
                    ctx.body = new Failure('Permission denied!')
                    return
                }
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