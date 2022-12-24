import { Failure, Success } from "@/classes/BasicResponse.class";
import { redisClient } from "@/core/REDIS/Redis";
import { UserInfo } from "@/models/UserInfo";
import { Middleware } from "koa";

const setQQavatar: Middleware = async ctx => {
    try {
        const body: any = ctx.request.body
        const qqNumber = body.qqNumber as string

        // 简单验证一下
        if (typeof qqNumber !== 'string') {
            ctx.body = new Failure('not string')
            return
        }

        // 拼装QQ头像接口
        const avatarUrl = `http://q2.qlogo.cn/headimg_dl?dst_uin=${qqNumber}&spec=640`

        // 写库
        const res = await UserInfo.update({
            avatar: avatarUrl
        }, {
            fields: ['avatar'],
            where: {
                uid: ctx.state.user.uid
            }
        })
        
        // 清除redis缓存
        redisClient.del(`${ctx.state.user.uid}:AVATAR`)

        if (res) {
            ctx.body = new Success('done', { avatar: avatarUrl })
        }
    } catch (error) {
        ctx.body = new Failure('server err')
    }
}

export default setQQavatar