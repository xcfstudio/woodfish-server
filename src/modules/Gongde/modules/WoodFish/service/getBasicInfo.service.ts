import { Success } from "@/classes/BasicResponse.class";
import { findUsernameByUid } from "@/modules/Users/utils/findXXByUid";
import { Middleware } from "koa";
import { getTodayRanking, getTotalRanking } from "../utils/getRanking";
import { getScoreFromRedis, getScoreFromSQL } from "../utils/getScore";

const getBasicInfoService: Middleware = async ctx => {


    const uid = ctx.state.user.uid as string
    // const username = ctx.state.user.username as string
    const username = await findUsernameByUid(uid)

    // console.log('------', uid)
   try {
    const todayScore = (await getScoreFromRedis(uid)) || 0
    const totalScore = (await getScoreFromSQL(uid)) + todayScore 
    const todayRanking = (await getTodayRanking(uid)) || 0
    const totalRanking = await getTotalRanking(uid) || 0

    const basicInfo = {
        uid,
        username,
        todayScore,
        totalScore,
        todayRanking,
        totalRanking
    }

    ctx.body = new Success('done', basicInfo)

   } catch (error) {
    console.log(error)
   }
   
}

export default getBasicInfoService