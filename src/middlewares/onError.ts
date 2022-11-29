import { ServerError } from "@/classes/BasicResponse.class";
import { Middleware } from "koa";

const onError: Middleware = async (ctx, next) => {
    await next().catch(err => {
        ctx.status = 500
        ctx.body = new ServerError('Server error!', {}, err.name)
    })

}

export default onError