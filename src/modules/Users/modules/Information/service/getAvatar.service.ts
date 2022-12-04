import { Success } from "@/classes/BasicResponse.class";
import { findAvatarByUid } from "@/modules/Users/utils/findXXByUid";
import { Middleware } from "koa";

const getAvatarService: Middleware = async ctx => {
    const uid = ctx.state.user.uid
    const avatar = await findAvatarByUid(uid)
    ctx.body = new Success('done', {avatar})
}

export default getAvatarService