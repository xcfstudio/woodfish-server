import schedule from 'node-schedule'
import syncRedisYesterdayScoreToSQL from './syncRedisDailyScoreToSQL'


const startTask01 = () => {
    const rule = '0 1 0 * * *'
    console.log(`已载入 -- 定时任务模块 RULE ${rule}`)
    schedule.scheduleJob(rule, () => {
        console.log('定时任务已触发')
        syncRedisYesterdayScoreToSQL()
    })
}


export {
    startTask01
}