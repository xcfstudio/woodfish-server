import { UserAccount } from "@/models/UserAccount"
import { compare } from "./hash"

// 数据库字段映射表
const mirror = {
    email: 'useremail',
    phone: 'userphone',
    name: 'username',
    uid: 'uid'
}

const verifyUserPassword = async (accountType: 'email'|'phone'|'name'|'uid', account: string, password: string): Promise<false|object> => {
    const res = await UserAccount.findOne({
        attributes: ['username','uid','password'],
        where: {
           [mirror[accountType]]: account
        }
    })
    // @ts-ignore
    if (res && res.password) {
        // @ts-ignore
       if (await compare(password, res.password)) {
        return res
       }
    }
    return false
    
}

export { verifyUserPassword }