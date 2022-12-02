import { Success } from "@/classes/BasicResponse.class";
import { redisClient } from "@/core/REDIS/Redis";
import { GongdeScore } from "@/models/GongdeScore";
import { UserAccount } from "@/models/UserAccount";
import { performance_config } from "config/performance";
import { Middleware } from "koa";
import RankingItem from '../interfaces/RankingItem.interface'

const totalRanking: Middleware = async ctx => {
    // 这个费性能，必须缓存，缓存一天即可
    await redisClient.select(0)
    const cache = await redisClient.get('TotalRankingCache')
    if (cache) {
        ctx.body = new Success('done', JSON.parse(cache))
    } else {
        const res = await GongdeScore.findAll({
            attributes: ['woodfish'],
            order: [
                // 降序排列
                ['woodfish', 'DESC']
            ],
            limit: 200,
            include: {
                model: UserAccount,
                attributes: ['uid', 'username'],

            }
        })
        const rankingList: RankingItem[] = []
        let rankingStart = 1
        for (let v of res) {
            const j = v.toJSON()
            const UserAccount = j.UserAccount || { uid: '未知uid', username: '未知用户' }
            const item: RankingItem = {
                uid: UserAccount.uid,
                username: UserAccount.username,
                score: j.woodfish,
                ranking: rankingStart
            }
            rankingList.push(item)
            rankingStart++
        }
        await redisClient.select(0)
        redisClient.set('TotalRankingCache', JSON.stringify(rankingList), {
            EX: performance_config.rankingCacheTime.total
        })
        ctx.body = new Success('done', rankingList)
    }

}

export default totalRanking