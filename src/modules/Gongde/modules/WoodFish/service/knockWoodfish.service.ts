import { redisClient } from "@/core/REDIS/Redis";
import { Middleware } from "koa";
import dayjs from 'dayjs'
import { getScoreFromRedis, getScoreFromSQL } from "../utils/getScore";


const knockWoodfish: Middleware = async ctx => {
    const redis_value = await redisClient.zScore(dayjs().format('YYYY-MM-DD'), `uid`)
    if (!redis_value) {
        const sql_value = await getScoreFromSQL('123')
        // 将数据库中的值缓存入redis
    }
    // await redisClient.zAdd(`${dayjs().format('YYYY-MM-DD')}:ranking`, {value: Date.now().toString(), score: Date.now()})
    // 获取redis中功德值
    const redis_val = await getScoreFromRedis('123')
    
    ctx.body = {
        code: 200,
        
        redis_val
    }
}

export default knockWoodfish