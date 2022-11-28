import { Failure, Success } from "@/classes/BasicResponse.class";
import { UserAccount } from "@/models/UserAccount";
import { generateToken } from "@/utils/generateToken";
import { addTokenToBlacklist } from "@/utils/tokenRedis";
import validateBodyDto from "@/utils/validateBodyDto";
import { verifyUserPassword } from "@/utils/verifyUserPassword";
import { Middleware } from "koa";
import sha256 from "sha256";
import ChangePasswordDto from "../dto/changePassword.dto";


const changePassword: Middleware = async ctx => {
    const body = ctx.request.body as ChangePasswordDto

    // 验证dto
    const err = await validateBodyDto(new ChangePasswordDto(body))
    if (err) {
        ctx.body = new Failure('validate error!', {}, err)
        return
    }

    // 验证旧密码是否正确
    const res = await verifyUserPassword('uid', ctx.state.user.uid, body.oldPassword)

    // 更新密码
    if (res) {
        const updatePwdRes = await UserAccount.update({
            password: body.newPassword
        }, {
            where: {
                uid: ctx.state.user.uid
            },
            fields: ['password']
        })


        // 生成新token
        ctx.body = new Success('Password changed!', {
            username: res.username,
            uid: res.uid,
            token: generateToken({
                uid: res.uid,
                username: res.username,
                status: res.status,
                secret: sha256(res.password).slice(0, 19)
            })
        })
        
        return
    }
    ctx.body = new Failure('Old password wrong!')
}

export default changePassword