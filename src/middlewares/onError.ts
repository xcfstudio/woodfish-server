import { ServerError } from "@/classes/BasicResponse.class";
import { Middleware } from "koa";
import fs from 'fs'
import path from "path";

const logPath = path.resolve(__dirname, '../', '../', 'logs', 'error.log')
const logStream = fs.createWriteStream(logPath, {flags: 'a'})

const onError: Middleware = async (ctx, next) => {
    await next().catch(err => {
        ctx.status = 500
        ctx.body = new ServerError('Server error!', {}, err)
        logStream.write(`----${Date.now()}----\n${err}\n----END----`)
    })

}

export default onError