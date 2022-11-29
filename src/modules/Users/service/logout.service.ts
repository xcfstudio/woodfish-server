import { Failure, Success } from "@/classes/BasicResponse.class";
import { addTokenToBlacklist } from "@/utils/tokenRedis";
import validateBodyDto from "@/utils/validateBodyDto";
import { Middleware } from "koa";
import LogoutDto from "../dto/logout.dto";

const logout: Middleware = async ctx => {
    const body: any = ctx.request.body

    const err = await validateBodyDto(new LogoutDto(body))
   if (err) {
      ctx.body = new Failure('validate error!', {}, err)
      return
   }

    const refreshToken: string[] = body.token
    refreshToken.forEach(async v => {
        await addTokenToBlacklist(v)
    })
    ctx.body = new Success('Logout success!', {})

}

export default logout