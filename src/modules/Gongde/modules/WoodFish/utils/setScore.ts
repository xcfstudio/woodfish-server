import { redisClient } from "@/core/REDIS/Redis";
import { GongdeScore } from "@/models/GongdeScore";
import dayjs from "dayjs";
import { getScoreFromSQL } from "./getScore";

/**
 * 向redis中设置功德值
 * @param uid 
 * @param score 
 */
const setScoreToRedis = async (uid: string, score: number) => {
    // await redisClient.select(0)
    await redisClient.zAdd(`${dayjs().format('YYYY-MM-DD')}:ranking`, {value: uid, score })
}

/**
 * 向sql中设置功德值（未知uid是否存在的情况下，耗费性能）
 * @param uid 
 * @param score 
 */
const setScoreToSQL = async (uid: string, score: number) => {
    const res = await getScoreFromSQL(uid)
    if (!res) {
        await GongdeScore.create({
            uid,
            woodfish: score
        })
    }
}

/**
 * 覆盖SQL中的功德值
 * @param uid 
 * @param score 
 */
const coverScoreToSQL = async (uid: string, score: number) => {
    await GongdeScore.update({
        woodfish: score
    }, {
        where: {
            uid
        }
    })
}

/**
 * 更新SQL中的功德值（加分）
 * @param uid 
 * @param score 
 */
const addScoreToSQL = async (uid: string, score: number) => {
    let res = await getScoreFromSQL(uid) as unknown as number
    res += score
    await coverScoreToSQL(uid, res)
}

/**
 * 创建一个功德字段，uid不存在的情况下
 * @param uid 
 * @param score 
 */
const createScoreField = async (uid: string, score: number) => {
    await GongdeScore.create({
        uid,
        woodfish: score
    })
}

export {
    setScoreToRedis, setScoreToSQL, coverScoreToSQL, addScoreToSQL, createScoreField
}