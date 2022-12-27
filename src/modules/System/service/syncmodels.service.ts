import sequelize from "@/core/ORM/sequelize";
import { Middleware } from "koa";
import fs from 'fs'
import path from "path";
import { Failure, Success } from "@/classes/BasicResponse.class";

const syncModels: Middleware = async ctx => {
    const dirPath = path.resolve(__dirname, '../../../../', 'tag')
    const lockPath = path.resolve(dirPath, 'db.lock')
    const exist = fs.existsSync(lockPath)
    console.log(dirPath)
    if (!exist) {
        fs.mkdirSync(path.resolve(dirPath))
        fs.writeFileSync(path.resolve(dirPath, 'db.lock'), 'locked')
        await sequelize.sync({alter: true})
        ctx.body = new Success('sync success', {})
    } else {
        ctx.body = new Failure('locked')
    }
}

export default syncModels