import { Sequelize } from "sequelize"
import { config } from "config/mySQL"

// sequelize实例

const sequelize = new Sequelize({
    dialect: 'mysql',
    username: config.username,
    password: config.password,
    host: config.host,
    database: config.database,
    logging: config.logging
})

export default sequelize