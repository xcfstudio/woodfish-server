import { Failure, Success } from "@/classes/BasicResponse.class"
import validateBodyDto from "@/utils/validateBodyDto"
import { getAccountType } from "@/utils/verifyRegex"
import { verifyAdminPassword, verifyUserPassword } from "@/modules/Users/utils/verifyUserPassword"
import { Middleware } from "koa"
import LoginDto from "../dto/login.dto"
import { generateToken } from "@/modules/Users/utils/generateToken"
import { security_config } from "config/security"
import { sha256BasedCrypt } from "@/utils/hash"

const login: Middleware = async ctx => {
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

   // 管理员账号验证流程
   if (body.admin) {
      // 验证管理员密码
      const admin_pwd_verify = await verifyAdminPassword(accountType, body.account, body.password)
      if (admin_pwd_verify) {
         if (admin_pwd_verify.status !== 'Y') {
            ctx.body = new Failure('Account blocked!')
            return
         }
         const payload = {
            username: admin_pwd_verify.username,
            uid: admin_pwd_verify.uid,
            status: admin_pwd_verify.status,
            secret: sha256BasedCrypt(admin_pwd_verify.password),
            admin: admin_pwd_verify.level
         }
         ctx.body = new Success('Login success!', { ...payload, ...generateToken(payload), exptime: security_config.tokenExp })
         return
      }
      ctx.body = new Failure('Account non-existent or password wrong!')
      return
   }

   // 普通用户验证流程
   /**
    * res_verify中保存丛数据库中取出的用户基本信息，没查到返回false
    */
   const res_verify = await verifyUserPassword(accountType, body.account, body.password)

   if (res_verify) {
      // status字段用于判断用户状态，Y表示正常
      if (res_verify.status !== 'Y') {
         ctx.body = new Failure('Account blocked!')
         return
      }
      const payload = {
         username: res_verify.username,
         uid: res_verify.uid,
         status: res_verify.status,
         secret: sha256BasedCrypt(res_verify.password)
      }
      // 登陆成功则返回用户基本信息和签发的token
      ctx.body = new Success('Login success!', { ...payload, ...generateToken(payload), exptime: security_config.tokenExp })
      return
   }

   ctx.body = new Failure('Account non-existent or password wrong!')

}

export default login