// JWT负载部分约束

interface JwtPayload {
    username: string
    uid: string
    status: string
    // type: string
}

export default JwtPayload