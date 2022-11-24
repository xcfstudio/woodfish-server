import { Middleware } from "koa";
import {UserAccount} from "@/models/UserAccount"
import { createRandomIdUnique } from "@/utils/createRandomId";
import { user_config } from "config/user";
import RegisterDto from '../dto/register.dto'
import { Failure, ServerError, Success, ValidateError } from "@/classes/BasicResponse.class";
import validateBodyDto from "@/utils/validateBodyDto";
import { UserInfo } from "@/models/UserInfo";

const register: Middleware = async ctx => {
    const body = ctx.request.body as RegisterDto
    // dto验证
    const err = await validateBodyDto(new RegisterDto(body))
    if (err) {
        ctx.body = new ValidateError(err)
        return // 此处务必return
    }

    // 生成随机唯一用户ID
    const uid = await createRandomIdUnique(user_config.uidLength)
    const user = UserAccount.build({
        uid: uid,
        username: `User_${uid}`,
        useremail: body.useremail.toLowerCase(),
        userphone: body.userphone,
        password: body.password,
    })
    const userInfo = UserInfo.build({
        uid
    })

    try {
        // 存入数据库
        await Promise.all([user.save(), userInfo.save()])
        ctx.body = new Success('注册成功！', {
            uid,
            username: `User_${uid}`
        })
    } catch (error:any) {
        ctx.body = new ServerError(
            error.errors[0].message, {}, error.name
        )
    }
}

export default register