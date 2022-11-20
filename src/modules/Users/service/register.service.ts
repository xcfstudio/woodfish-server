import { Middleware } from "koa";
import UserAccount from "@/models/UserAccount"
import { createRandomIdUnique } from "@/utils/createRandomId";
import { user_config } from "config/user";

interface bodyType {
    useremail: string
    userphone?: string
    password: string
}

const register: Middleware = async ctx => {
    const body: bodyType = (ctx.request.body as bodyType)
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
        await user.save()
        ctx.status = 200
        ctx.body = {
            code: 200,
            status: 'success',
            data: {
                uid,
                username: `User_${uid}`
            }
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            code: 400,
            status: 'failure',
            // @ts-ignore
            message: error.errors[0].message
        }
    }

}

export default register