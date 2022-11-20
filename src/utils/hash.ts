import bcrypt from 'bcrypt'
import { security_config } from 'config/security'

/**
 * 散列处理(异步)
 * @param data 明文
 * @returns 哈希值
 */
const hash = async (data: string): Promise<string> => {
    return bcrypt.hash(data, security_config.saltRounds)
}

/**
 * 散列处理(同步)
 * @param data 明文
 * @returns 哈希值
 */
 const hashSync = (data: string): string => {
    return bcrypt.hashSync(data, security_config.saltRounds)
}

/**
 * 比较
 * @param data 明文
 * @param hash 密文
 * @returns boolean
 */
const compare = async (data: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(data, hash)
}

export {
    hash, hashSync, compare
}