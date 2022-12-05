// 系统性能配置文件

const performance_config = {
    // 排行榜缓存时间
    rankingCacheTime: {
        // 日榜
        daily: 300,
        // 总榜
        total: 60 * 60 * 24 - 60,
        // 单用户总排名缓存时间
        singleTotal: 60 * 60 * 2
    },
    // redis中uid与username键值缓存时间
    usernameCacheTime: 120,
    // redis中缓存用户总功德（来自SQL）的时间
    userTotalScoreCacheTime: 3600 * 5
}

export {
    performance_config
}