import { Failure } from "@/classes/BasicResponse.class"
import validateBodyDto from "@/utils/validateBodyDto"
import { getAccountType } from "@/utils/verify"
import { Middleware } from "koa"
import LoginDto from "../dto/login.dto"

const login:Middleware = async ctx => {
   const body = ctx.request.body as LoginDto
   // dto验证
   const err = await validateBodyDto(new LoginDto(body))
   if (err) {
    ctx.body = new Failure('validate error!', {}, err)
    return
   }

   // 识别账号类型
   const accountType = getAccountType(body.account)
   if (!accountType) {
    ctx.body = new Failure('Illegal account name!')
    return
   }

    ctx.body = {
        code: 200,
        mesage: 'login'
    }
}

export default login