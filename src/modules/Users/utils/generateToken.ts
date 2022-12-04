import jwt from 'jsonwebtoken'
import { secretKeys } from "secretkey/secret"
import { security_config } from "config/security"
import JwtPayload from '@/interfaces/JwtPayload'


interface DoubleToken {
    accesstoken: string
    refreshtoken: string
}
/**
 * 签发双令牌
 * @param payload 
 * @returns 
 */
const generateToken = (payload: JwtPayload): DoubleToken => {
    const accesstoken = jwt.sign({...payload, type: 'access'}, secretKeys.secretKey, {expiresIn: security_config.tokenExp.access * 1000, algorithm: 'HS256'})
    const refreshtoken = jwt.sign({...payload, type: 'refresh'} , secretKeys.secretKey, {expiresIn: security_config.tokenExp.refresh * 1000, algorithm: 'HS256'})
    return {
        accesstoken, refreshtoken
    }
}

export { generateToken }