import { Failure, Success } from "@/classes/BasicResponse.class"
import { initOptions } from "@/models/UserAccount"
import validateBodyDto from "@/utils/validateBodyDto"
import { getAccountType } from "@/utils/verify"
import { verifyUserPassword } from "@/utils/verifyUserPassword"
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

   // 验证密码
   const res_verify = await verifyUserPassword(accountType, body.account, body.password)

   if (res_verify) {
    // 签发token
    ctx.body = new Success('Login success!', res_verify )
    return
   }

   ctx.body = new Failure('Account non-existent or password wrong!')

   
}

export default login