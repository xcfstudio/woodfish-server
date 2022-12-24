import { Failure, Success } from "@/classes/BasicResponse.class";
import { redisClient } from "@/core/REDIS/Redis";
import { UserAccount } from "@/models/UserAccount";
import { UserInfo } from "@/models/UserInfo";
import validateBodyDto from "@/utils/validateBodyDto";
import { Middleware } from "koa";
import UpdateUserInfoDto from "../dto/updateUserInfo.dto";

const updateUserInfo: Middleware = async ctx => {
    const body = ctx.request.body as UpdateUserInfoDto
    // 验证dto
    const err = await validateBodyDto(new UpdateUserInfoDto(body))
    if (err) {
        ctx.body = new Failure('validate error!', {}, err)
        return
     }
    //  console.log(ctx.state.user.uid, body)
    //  console.log(Object.keys(new UpdateUserInfoDto(body)))
     const userInfo = new UserInfo()
     
    try {
        const res = await UserInfo.update({
            ...body
        }, {
            fields: Object.keys(new UpdateUserInfoDto(body)),
            where: {
                uid: ctx.state.user.uid
            },

        })
        const res2 = await UserAccount.update({
            username: body.username
        }, {
            fields: ['username'],
            where: {
                uid: ctx.state.user.uid
            }
        })
        redisClient.del(`${ctx.state.user.uid}:USERNAME`)
        if (res && res2) {
            ctx.body = new Success('更新成功', {affectNumber: res})
            return
        }
    } catch (error) {
        console.log('eeeeee', error)
    }
   
    ctx.body = new Failure('db err')
}

export default updateUserInfo