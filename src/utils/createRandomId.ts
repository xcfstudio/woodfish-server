import {UserAccount} from "@/models/UserAccount"

/**
 * 生成随机ID
 * @param digit 位数
 * @returns ID
 */
const createRandomId = (digit: number): string => {
    let r = Math.random()
    if (r < 0.1) r += 0.1
    return Math.round(r * Math.pow(10, digit)).toString()
}

/**
 * 从数据库中查询是否重复，有重复则重新生成
 * @param digit 位数
 * @returns ID
 */
const createRandomIdUnique = async (digit: number): Promise<string> => {
    const id = createRandomId(digit)
    const res = await UserAccount.findOne({
        where: {
            uid: id
        }
    })
    
    if (res) createRandomIdUnique(digit)
    return id
   
}


export {createRandomId, createRandomIdUnique}