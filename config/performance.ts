// 系统性能配置文件

const performance_config = {
    // 排行榜缓存时间
    rankingCacheTime: {
        // 日榜
        daily: 300
    },
    // redis中uid与username键值缓存时间
    usernameCacheTime: 120
}

export {
    performance_config
}