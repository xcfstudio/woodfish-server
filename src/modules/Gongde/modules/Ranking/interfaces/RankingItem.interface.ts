// 排行榜成员接口定义

interface RankingItemInterface {
    uid: string
    username: string
    score: number | null
    ranking: number
}

export default RankingItemInterface