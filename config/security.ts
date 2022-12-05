// 安全性配置文件

import dayjs from "dayjs"

const security_config = {
    // 加盐迭代次数
    saltRounds: 5,
    // token过期时间
    tokenExp: {
        access: 3600,
        refresh: 3600 * 24 * 7
    },
    // totp算法
    totp: {
        // key值的salt部分
        Salt: `bdf3jz345345lni`,
        // 生效时间
        period: 30
    }
}

export {
    security_config
}