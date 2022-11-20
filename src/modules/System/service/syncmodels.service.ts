import sequelize from "@/core/ORM/sequelize";
import { Middleware } from "koa";

const syncModels: Middleware = async ctx => {
    await sequelize.sync()
    ctx.body = {
        code: 200,
        message: 'success'
    }
}

export default syncModels