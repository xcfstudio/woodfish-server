import { AdminAccount } from "@/models/AdminAccount"
import { UserAccount } from "@/models/UserAccount"
import { compare } from "../../../utils/hash"

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
    level?: string
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

const verifyAdminPassword = async (accountType: 'email'|'phone'|'name'|'uid', account: string, password: string): Promise<false|VerifyResult> => {
    const res = (await AdminAccount.findOne({
        attributes: ['username','uid','password','status', 'level'],
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

export { verifyUserPassword, verifyAdminPassword }