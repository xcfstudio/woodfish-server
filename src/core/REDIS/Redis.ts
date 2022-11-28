import { createClient } from 'redis'

const redisClient = createClient({
    url: 'redis://127.0.0.1:6379'
})

redisClient.on('error', () => {
    console.log('Redis error!')
})

redisClient.connect()

export {
    redisClient
}