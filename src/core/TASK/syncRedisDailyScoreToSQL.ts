// 将redis中的日榜数据同步至SQL中

import { addScoreToSQL } from "@/modules/Gongde/modules/WoodFish/utils/setScore"
import dayjs from "dayjs"
import { redisClient } from "../REDIS/Redis"

/**
 * 把昨天日榜数据逐个刷入数据库
 */
const syncRedisYesterdayScoreToSQL = async () => {
    
    // 获取昨天时间戳
    // const today = dayjs().format('YYYY-MM-DD')
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    
    await redisClient.select(0)
    // 获取昨日redis排行榜数据
    // 异步迭代器
    const yesterday_ranking = redisClient.zScanIterator(`${yesterday}:ranking`)

    // 数据刷进SQL
    for await (const { score, value } of yesterday_ranking) {
        await addScoreToSQL(value, score)
    }
}

