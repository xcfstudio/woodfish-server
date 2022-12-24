import sequelize from "@/core/ORM/sequelize"
import { redisClient } from "@/core/REDIS/Redis"
import { performance_config } from "config/performance"
import dayjs from "dayjs"

const getTotalRanking = async (uid: string) => {

    // 单个用户排名耗费性能 需要缓存 缓存时间在配置文件
    const rankingCache = await redisClient.get(`${uid}:SINGLE_RANKING`)
    if (rankingCache) {
        return parseInt(rankingCache)
    }

    try {
        const res: any = await sequelize.query(
            `SELECT RANK_NUM FROM (SELECT Rank() OVER (ORDER BY GongdeScore.woodfish DESC) AS RANK_NUM,uid,woodfish FROM GongdeScore ) AS T WHERE uid=${sequelize.escape(uid)};`
        )
        console.log(res)
        // const ranking = res[0][0].RANK_NUM || 0
        const ranking = res[0][0] ? res[0][0].RANK_NUM : 0
        redisClient.set(`${uid}:SINGLE_RANKING`, ranking.toString(), {
            EX: performance_config.rankingCacheTime.singleTotal
        })
        return ranking
    } catch (error) {
        return null
    }
}


const getTodayRanking = async (uid: string) => {
    // await redisClient.select(0)
    const totalMem = await redisClient.zCard(`${dayjs().format('YYYY-MM-DD')}:ranking`) || 0
    let r = await redisClient.zRank(`${dayjs().format('YYYY-MM-DD')}:ranking`, uid)
    // console.log(r)
    if (r !== null) {
        
        return totalMem - r
    } else {
        return null
    }
    
   
}


export {
    getTotalRanking, getTodayRanking
}