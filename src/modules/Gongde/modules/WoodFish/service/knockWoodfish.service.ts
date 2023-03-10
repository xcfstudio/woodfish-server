import { redisClient } from "@/core/REDIS/Redis";
import { Middleware } from "koa";
import dayjs from 'dayjs'
import { getScoreFromRedis, getScoreFromSQL } from "../utils/getScore";
import { createScoreField, setScoreToRedis } from "../utils/setScore";
import { Success } from "@/classes/BasicResponse.class";

/**
 * 敲木鱼
 * @param ctx 
 * @returns 
 */
const knockWoodfish: Middleware = async ctx => {
    const uid = ctx.state.user.uid
    // const uid = '12333'
    // 获取redis中的功德值（根据uid）
    let v:any = await getScoreFromRedis(uid)
    // console.log(v)
    if (!v) {
        // 若redis中无功德数据则读取sql中的功德数据
        // const v = await getScoreFromSQL(uid)
       
        // if (v) {
        //     // sql中读取到功德值后缓存入redis
        //     await setScoreToRedis(uid, v)
        //     ctx.body = new Success('done', {score: 1})
        //     return
        // } else {
        //     // 初始化sql中的数值为1
        //     await createScoreField(uid, 0)
        //     ctx.body = new Success('done', {score: 1})
        //     return
        // }
        v = 0
    }
    v++
    await setScoreToRedis(uid, v)
    ctx.body = new Success('done', {todayScore: v})
    
    // await redisClient.zAdd(`${dayjs().format('YYYY-MM-DD')}:ranking`, {value: Date.now().toString(), score: Date.now()})
   
}

export default knockWoodfish