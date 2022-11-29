import { redisClient } from "@/core/REDIS/Redis";
import { Middleware } from "koa";
import dayjs from 'dayjs'


const knockWoodfish: Middleware = async ctx => {
    await redisClient.zAdd(`${dayjs().format('YYYY-MM-DD')}:ranking`, {value: Date.now().toString(), score: Date.now()})
    
    ctx.body = {
        code: 200
    }
}

export default knockWoodfish