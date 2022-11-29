import bcrypt from 'bcrypt'
import { security_config } from '@@/config/security'
import sha256 from 'sha256'

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

/**
 * 基于sha256的哈希算法
 * @param data 
 * @returns 
 */
const sha256BasedCrypt = (data: string) => {
    return sha256(sha256(data).slice(0, 79)).slice(0, 19)
}

export {
    hash, hashSync, compare, sha256BasedCrypt
}