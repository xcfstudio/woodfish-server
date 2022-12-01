import { Success } from "@/classes/BasicResponse.class";
import { Middleware } from "koa";
import { getScoreFromRedis, getScoreFromSQL } from "../utils/getScore";

/**
 * 获取总功德
 * @param ctx 
 */
const getScoreService: Middleware = async ctx => {
    const uid = ctx.state.user.uid
    const res_redis = await getScoreFromRedis(uid)
    const res_sql = await getScoreFromSQL(uid)
    ctx.body = new Success('done', {
        score: res_redis + res_sql
    })
}

export default getScoreService