import { redisClient } from "@/core/REDIS/Redis"
import { GongdeScore } from "@/models/GongdeScore"
import dayjs from 'dayjs'

/**
 * 获取今日功德值
 * @param uid 
 * @returns 
 */
const getScoreFromRedis = async (uid: string) => {
    await redisClient.select(0)
    return await redisClient.zScore(`${dayjs().format('YYYY-MM-DD')}:ranking`, uid)
}

/**
 * 获取SQL中总的功德值
 * @param uid 
 * @returns 
 */
const getScoreFromSQL = async (uid: string) => {
    const res = await GongdeScore.findOne({
        attributes: ['woodfish'],
        where: {
            uid
        }
    })
    return res?.toJSON().woodfish
}



export {
    getScoreFromRedis, getScoreFromSQL
}