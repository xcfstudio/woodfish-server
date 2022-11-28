import { Success } from "@/classes/BasicResponse.class";
import { addTokenToBlacklist } from "@/utils/tokenRedis";
import { Middleware } from "koa";

const logout: Middleware = async ctx => {
    const body: any = ctx.request.body
    const refreshToken: string[] = body.token
    refreshToken.forEach(async v => {
        await addTokenToBlacklist(v)
    })
    ctx.body = new Success('Logout success!', {})

}

export default logout