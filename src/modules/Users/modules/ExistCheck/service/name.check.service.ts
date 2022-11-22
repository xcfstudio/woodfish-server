import { Success } from "@/classes/BasicResponse.class";
import UserAccount from "@/models/UserAccount";
import { Middleware } from "koa";

const nameCheck: Middleware = async ctx => {
    const name = ctx.params.name
    const res = await UserAccount.findOne({
        attributes: ['username'],
        where: {
            username: name
        }
    })

    if (res) {
        ctx.body = new Success('existent', res)
    } else {
        ctx.body = new Success('non-existent', {})
    }
}

export default nameCheck