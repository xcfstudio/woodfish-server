import { UserAccount } from "@/models/UserAccount"
import { compare } from "./hash"

// 数据库字段映射表
const mirror = {
    email: 'useremail',
    phone: 'userphone',
    name: 'username',
    uid: 'uid'
}

interface VerifyResult {
    username: string
    uid: string
    password: string
    status: string
    role?: string
}

const verifyUserPassword = async (accountType: 'email'|'phone'|'name'|'uid', account: string, password: string): Promise<false|VerifyResult> => {
    const res = (await UserAccount.findOne({
        attributes: ['username','uid','password','status'],
        where: {
           [mirror[accountType]]: account
        }
    })) as unknown as VerifyResult
    
    if (res && res.password) {
        
       if (await compare(password, res.password)) {
        return res
       }
    }
    return false
    
}

export { verifyUserPassword }