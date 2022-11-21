import { Middleware } from "koa";
import UserAccount from "@/models/UserAccount"
import { createRandomIdUnique } from "@/utils/createRandomId";
import { user_config } from "config/user";
import RegisterDto from '../dto/register.dto'
import { validate } from "class-validator";
import { Failure, ServerError, Success } from "@/classes/BasicResponse.class";

const register: Middleware = async ctx => {
    const body = (ctx.request.body as RegisterDto)

    // dto验证
    const dto = new RegisterDto(
        body.useremail, body.password, body.userphone, body.verifycode
    )
    try {
        const err = await validate(dto)
        if (err.length) {
            ctx.status = 400
            ctx.body = new Failure('验证失败', [], err)
            return
        }
    } catch (error: any) {
        ctx.body = new ServerError('server error', [], error)
        return
    }

    // 生成随机唯一用户ID
    const uid = await createRandomIdUnique(user_config.uidLength)
    const user = UserAccount.build({
        uid: uid,
        username: `User_${uid}`,
        useremail: body.useremail,
        userphone: body.userphone,
        password: body.password
    })

    try {
        // 存入数据库
        await user.save()
        ctx.status = 200
        ctx.body = new Success('注册成功！', {
            uid,
            username: `User_${uid}`
        })
    } catch (error:any) {
        ctx.status = 500
        ctx.body = new ServerError(
            error.errors[0].message, [], error.name
        )
    }
}

export default register