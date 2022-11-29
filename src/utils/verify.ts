import { user_config } from "config/user"

/**
 * 验证邮箱
 * @param email 邮箱地址
 * @returns boolean
 */
const verifyEmail = (email: string): boolean => {
    const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
    return reg.test(email)
}

/**
 * 验证手机号
 * @param phoneNumber 手机号
 * @returns boolean
 */
const verifyPhoneNumber = (phoneNumber: string): boolean => {
    const reg = /0?(13|14|15|17|18|19)[0-9]{9}/
    return reg.test(phoneNumber)
}

/**
 * 验证用户ID，根据配置文件中的ID位数
 * @param uid 用户ID
 * @returns boolean
 */
const verifyUid = (uid: string): boolean => {
    const reg = new RegExp(`\\d{${user_config.uidLength}}`)
    return reg.test(uid)
}

/**
 * 验证用户名
 * @param userName 用户名
 * @returns boolean
 */
const verifyUserName = (userName: string): boolean => {
   return userName.length >= 2 && userName.length <= user_config.uidLength + 8
}

const verifyTokenString = (token: string): boolean => {
    const reg = /.+\..+\..+/
    return reg.test(token)
}


const getAccountType = (account: string): 'email'|'phone'|'name'|'uid'|false => {
    if (verifyEmail(account)) return 'email'
    if (verifyPhoneNumber(account)) return 'phone'
    if (verifyUserName(account)) return 'name'
    if (verifyUid(account)) return 'uid'
    return false
}

export {
    verifyEmail, verifyPhoneNumber, verifyUid, verifyUserName, verifyTokenString, getAccountType
}