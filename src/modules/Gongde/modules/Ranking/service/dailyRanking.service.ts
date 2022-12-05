import { Success } from "@/classes/BasicResponse.class";
import { redisClient } from "@/core/REDIS/Redis";
import { findUsernameByUid } from "@/modules/Users/utils/findXXByUid";
import { performance_config } from "config/performance";
import dayjs from "dayjs";
import { Middleware } from "koa";
import { getScoreFromRedis } from "../../WoodFish/utils/getScore";

import RankingItem from '../interfaces/RankingItem.interface'
/**
 * 排行榜-日榜
 * @param ctx 
 */
const dailyRanking: Middleware = async ctx => {
    // 这个挺消耗性能的，需要缓存
    await redisClient.select(0)
    const cache = await redisClient.get('DailyRankingCache')
    if (cache) {
        ctx.body = new Success('done', JSON.parse(cache))
    } else {
        await redisClient.select(0)
        const totalNum = await redisClient.zCard(`${dayjs().format('YYYY-MM-DD')}:ranking`)
        const res = await redisClient.zRange(`${dayjs().format('YYYY-MM-DD')}:ranking`, totalNum + 1 -199, totalNum + 1)
        const rankingList: RankingItem[] = []
        let rankingStart = res.length
        for (let uid of res) {
            const username = await findUsernameByUid(uid)
            const score = await getScoreFromRedis(uid)
            rankingList.unshift({
                uid,
                username,
                score,
                ranking: rankingStart
            })
            rankingStart--
        }
        redisClient.set('DailyRankingCache', JSON.stringify(rankingList), {
            EX: performance_config.rankingCacheTime.daily
        })
        ctx.body = new Success('done', rankingList)
    }

}

export default dailyRanking