import { redisClient } from "@/core/REDIS/Redis"
import { GongdeScore } from "@/models/GongdeScore"
import dayjs from 'dayjs'

const getScoreFromRedis = async (uid: string) => {
    await redisClient.select(0)
    return await redisClient.zScore(`${dayjs().format('YYYY-MM-DD')}:ranking`, uid)
}

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