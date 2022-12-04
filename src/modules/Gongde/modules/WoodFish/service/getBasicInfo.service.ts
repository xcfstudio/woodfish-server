import { Success } from "@/classes/BasicResponse.class";
import { Middleware } from "koa";
import { getTodayRanking, getTotalRanking } from "../utils/getRanking";
import { getScoreFromRedis, getScoreFromSQL } from "../utils/getScore";

const getBasicInfoService: Middleware = async ctx => {
    const uid = ctx.state.user.uid as string
    const username = ctx.state.user.username as string

    const todayScore = (await getScoreFromRedis(uid)) || 0
    const totalScore = (await getScoreFromSQL(uid)) + todayScore
    const todayRanking = (await getTodayRanking(uid)) || '--'
    const totalRanking = await getTotalRanking(uid)
    const basicInfo = {
        uid,
        username,
        todayScore,
        totalScore,
        todayRanking,
        totalRanking
    }

    ctx.body = new Success('done', basicInfo)
}

export default getBasicInfoService