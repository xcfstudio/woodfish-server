import { Failure, Success } from "@/classes/BasicResponse.class";
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
     console.log(ctx.state.user.uid, body)
     console.log(Object.keys(new UpdateUserInfoDto(body)))
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
        if (res) {
            ctx.body = new Success('Update success!', {affectNumber: res})
            return
        }
    } catch (error) {
        console.log('eeeeee', error)
    }
   
    ctx.body = new Failure('db err')
}

export default updateUserInfo