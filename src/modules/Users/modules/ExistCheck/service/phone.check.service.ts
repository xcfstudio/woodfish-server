import { Success } from "@/classes/BasicResponse.class";
import {UserAccount} from "@/models/UserAccount";
import { Middleware } from "koa";

const phoneCheck: Middleware = async ctx => {
    const phone = ctx.params.phone
    const res = await UserAccount.findOne({
        attributes: ['userphone'],
        where: {
            userphone: phone
        }
    })

    if (res) {
        ctx.body = new Success('existent', res)
    } else {
        ctx.body = new Success('non-existent', {})
    }
}

export default phoneCheck