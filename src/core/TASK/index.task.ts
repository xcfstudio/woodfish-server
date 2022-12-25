import schedule from 'node-schedule'
import syncRedisYesterdayScoreToSQL from './syncRedisDailyScoreToSQL'


const startTask = () => {
    console.log('已载入 -- 定时任务模块')
    const rule = '5 0 0 * * *'
    const task = schedule.scheduleJob(rule, () => {
        console.log('定时任务已触发')
        syncRedisYesterdayScoreToSQL()
    })
}


export {
    startTask
}