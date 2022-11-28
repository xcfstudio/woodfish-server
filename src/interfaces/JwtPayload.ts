// JWT负载部分约束

interface JwtPayload {
    username: string
    uid: string
    status: string
    secret: string //根据密码生成的，用于检测用户是否修改了密码
    // type: string
}

export default JwtPayload