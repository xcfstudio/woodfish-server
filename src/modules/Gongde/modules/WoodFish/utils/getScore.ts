import { redisClient } from "@/core/REDIS/Redis"
import { GongdeScore } from "@/models/GongdeScore"
import { performance_config } from "config/performance"
import dayjs from 'dayjs'

/**
 * 获取今日功德值
 * @param uid 
 * @returns 
 */
const getScoreFromRedis = async (uid: string) => {
   
    // const r =  await redisClient.zScore(`${dayjs().format('YYYY-MM-DD')}:ranking`, uid)
    const k = `${dayjs().format('YYYY-MM-DD')}:ranking`
    // await redisClient.select(0)
    const r =  await redisClient.zScore(k, uid)
    // const r =  666
    // console.log(r, k, uid)
    return r
}

/**
 * 获取SQL中总的功德值
 * @param uid 
 * @returns 
 */
const getScoreFromSQL = async (uid: string) => {
    // 需要缓存
    // await redisClient.select(3)
    const cache = await redisClient.get(`${uid}:SQL_SCORE`)
    if (cache) {
        return parseInt(cache)
    }
    const res = await GongdeScore.findOne({
        attributes: ['woodfish'],
        where: {
            uid
        }
    })
    const gd = res?.toJSON().woodfish || 0
    // console.log(res, '---------ddddd')
    // await redisClient.select(3)
    redisClient.set(`${uid}:SQL_SCORE`, String(gd), {
        EX: performance_config.userTotalScoreCacheTime
    })
    return gd
}



export {
    getScoreFromRedis, getScoreFromSQL
}