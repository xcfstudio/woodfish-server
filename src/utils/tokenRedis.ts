import { redisClient } from "@/core/REDIS/Redis"
import { security_config } from "config/security"
import { verifyTokenString } from "./verify"

/**
 * 检测token是否存在于黑名单中
 * @param jwtToken 
 * @returns 
 */
const tokenFilter = async (jwtToken: string) => {
    const tokenSign = jwtToken.split('.')[2]
    await redisClient.select(1)
    return await redisClient.get(tokenSign)
}

/**
 * 向黑名单中加入token
 * @param jwtToken 
 * @returns 
 */
const addTokenToBlacklist = async (jwtToken: string) => {
    if (verifyTokenString(jwtToken)) return 'err'
    const tokenSign = jwtToken.split('.')[2]
    await redisClient.select(1)
    return await redisClient.set(tokenSign, 'b', {
        EX: security_config.tokenExp.refresh
    })
}

export {
    tokenFilter, addTokenToBlacklist
}