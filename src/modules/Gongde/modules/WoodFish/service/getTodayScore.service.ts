import { Success } from "@/classes/BasicResponse.class";
import { Middleware } from "koa";
import { getScoreFromRedis } from "../utils/getScore";

/**
 * 获取总功德
 * @param ctx 
 */
const getTodayScoreService: Middleware = async ctx => {
    const uid = ctx.state.user.uid
    const res_redis = await getScoreFromRedis(uid)
    ctx.body = new Success('done', {
        todayScore: res_redis
    })
}

export default getTodayScoreService