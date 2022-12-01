import { redisClient } from "@/core/REDIS/Redis"
import { UserAccount } from "@/models/UserAccount"
import { performance_config } from "config/performance"

const findUsernameByUid = async (uid: string) => {
    // 高频使用，需要缓存
    await redisClient.select(2)
    const cache = await redisClient.get(uid)
    if (cache) {
        return cache
    } else {
        const res = await UserAccount.findOne({
            attributes: ['username'],
            where: {
                uid
            }
        })
        if (!res) {
            redisClient.set(uid, '未知用户', {
                EX: performance_config.usernameCacheTime
            })
            return '未知用户'
        }
        const username = res.toJSON().username as string
        await redisClient.select(2)
        redisClient.set(uid, username, {
            EX: performance_config.usernameCacheTime
        })
        return username
    }

}

export {
    findUsernameByUid
}