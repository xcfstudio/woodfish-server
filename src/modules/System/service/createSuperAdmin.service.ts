import { Failure, Success } from "@/classes/BasicResponse.class";
import { AdminAccount } from "@/models/AdminAccount";
import { createRandomId } from "@/modules/Users/utils/createRandomId";
import { user_config } from "config/user";
import { Middleware } from "koa";
import fs from 'fs'
import path from 'path'

const createSuperAdmin: Middleware = async ctx => {
   

    const dirPath = path.resolve(__dirname, '../../../../', 'lock')
    const lockPath = path.resolve(dirPath, 'SuperAdmin.lock')
    const exist = fs.existsSync(lockPath)
    if (!exist) {
        // 判断文件夹是否存在
        const stat = new Promise((resolve, reject) => {
            fs.stat(path.resolve(dirPath), (err, stat) => {
                if (err) {
                    reject(err)
                }
                resolve(stat)
            })
        })
        const s = await stat
            if (!s) {
                fs.mkdirSync(path.resolve(dirPath))
            } else {
                fs.writeFileSync(path.resolve(dirPath, 'SuperAdmin.lock'), 'locked')
                const res = await AdminAccount.create({
                    uid: createRandomId(user_config.uidLength),
                    username: 'SuperAdmin',
                    password: '123456',
                    status: 'Y',
                    level: 'super'
                })
                if (res) {
                    ctx.body = new Success('done', res)
                }
            }
    } else {
        ctx.body = new Failure('locked')
    }
}

export default createSuperAdmin