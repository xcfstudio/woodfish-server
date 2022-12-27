import { createClient } from 'redis'
import redis_config from '../../../config/redis'
const redisClient = createClient({
    url: `redis://${redis_config.host}:${redis_config.port}`
})

redisClient.on('error', () => {
    console.log('Redis error!')
})

redisClient.connect()

export {
    redisClient
}