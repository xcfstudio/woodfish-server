import { Success } from "@/classes/BasicResponse.class";
import UserAccount from "@/models/UserAccount";
import { Middleware } from "koa";

const emailCheck: Middleware = async ctx => {
    const email = ctx.params.email
    const res = await UserAccount.findOne({
        attributes: ['useremail'],
        where: {
            useremail: email
        }
    })

    if (res) {
        ctx.body = new Success('existent', res)
    } else {
        ctx.body = new Success('non-existent', {})
    }
}

export default emailCheck