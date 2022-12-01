import { DataTypes, ModelAttributes } from "sequelize"
import sequelize from "@/core/ORM/sequelize"
import { user_config } from "config/user"
import { UserAccount } from "./UserAccount"

// 用户个人信息模型，存储用户个人信息相关数据

const initOptions: ModelAttributes = {
    tid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
        
    },
    uid: {
        type: DataTypes.STRING(user_config.uidLength),
        allowNull: false,
        unique: true
    },
    woodfish: {
        type: DataTypes.INTEGER
    },
    donate: {
        type: DataTypes.INTEGER
    }
}

console.log('已载入 -- GongdeScore模型')

const GongdeScore = sequelize.define('GongdeScore', initOptions, {
    freezeTableName: true
})

GongdeScore.belongsTo(UserAccount, {
    foreignKey: 'uid'
})

export { GongdeScore, initOptions } 