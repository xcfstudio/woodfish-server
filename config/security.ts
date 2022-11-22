const security_config = {
    // 加盐迭代次数
    saltRounds: 5,
    // token过期时间
    tokenExp: {
        access: 1800,
        refresh: 3600 * 24 * 7
    }
}

export {
    security_config
}