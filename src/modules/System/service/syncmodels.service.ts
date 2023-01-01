import sequelize from "@/core/ORM/sequelize";
import { Middleware } from "koa";
import fs from 'fs'
import path from "path";
import { Failure, Success } from "@/classes/BasicResponse.class";

const syncModels: Middleware = async ctx => {
    const dirPath = path.resolve(__dirname, '../../../../', 'lock')
    const lockPath = path.resolve(dirPath, 'db.lock')
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
                fs.writeFileSync(path.resolve(dirPath, 'db.lock'), 'locked')
                await sequelize.sync({ alter: true })
                ctx.body = new Success('sync success', {})
            }
    } else {
        ctx.body = new Failure('locked')
    }
}

export default syncModels