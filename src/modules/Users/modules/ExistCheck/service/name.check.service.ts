import { Success } from "@/classes/BasicResponse.class";
import {UserAccount} from "@/models/UserAccount";
import { Middleware } from "koa";

const nameCheck: Middleware = async ctx => {
    const name = ctx.params.name
    const res = await UserAccount.findOne({
        attributes: ['username', 'uid'],
        where: {
            username: name
        }
    })

    if (res) {
        ctx.body = new Success('existent', {...res, exist: true})
    } else {
        ctx.body = new Success('non-existent', {exist: false})
    }
}

export default nameCheck