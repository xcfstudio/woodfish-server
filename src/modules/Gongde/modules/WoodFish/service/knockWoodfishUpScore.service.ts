import { Failure, Success, ValidateError } from "@/classes/BasicResponse.class";
import validateBodyDto from "@/utils/validateBodyDto";
import { security_config } from "config/security";
import { Middleware } from "koa";
import totp from 'totp-generator'
import UpScoreDto from "../dto/upScore.dto";
import { getScoreFromRedis, getScoreFromSQL } from "../utils/getScore";
import { createScoreField, setScoreToRedis } from "../utils/setScore";

const knockWoodfishUpScoreService: Middleware = async ctx => {
    const body = ctx.request.body as UpScoreDto
     // dto验证
     const err = await validateBodyDto(new UpScoreDto(body))
     if (err) {
         ctx.body = new ValidateError(err)
         return // 此处务必return
     }

   try {
    const timeToken = totp(`${security_config.totp.Salt}`, {
        algorithm: 'SHA-256',
        digits: 10,
        period: security_config.totp.period
    })
    if (body.secret !== timeToken) {
        ctx.body = new Failure('不要作弊哦')
        return
    }
   } catch (error) {
    console.log(error)
   }

   


    const uid = ctx.state.user.uid
    const submitScore = body.score
    // const uid = '12333'
    // 获取redis中的功德值（根据uid）
    let v = await getScoreFromRedis(uid)
    // console.log(v)
    if (!v) {
        // // 若redis中无功德数据则读取sql中的功德数据
        // const v = await getScoreFromSQL(uid)
       
        // if (v) {
        //     // sql中读取到功德值后缓存入redis
        //     await setScoreToRedis(uid, submitScore)
        //     ctx.body = new Success('done', {score: 1})
        //     return
        // } else {
        //     // 初始化sql中的数值为0
        //     await createScoreField(uid, 0)
        //     ctx.body = new Success('done', {score: submitScore})
        //     return
        // }
        v = 0
    }
    v+=submitScore
    await setScoreToRedis(uid, v)
    ctx.body = new Success('done', {todayScore: v})
}

export default knockWoodfishUpScoreService