import { DataTypes, ModelAttributes } from "sequelize"
import sequelize from "@/core/ORM/sequelize"
import { user_config } from "config/user"
import { UserAccount } from "./UserAccount"

// 用户反馈信息模型，存储用户个人信息相关数据

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
    },
    feedbackContent: {
        type: DataTypes.TEXT({length: 'medium'}),
        allowNull: false
    },
    telNumber: {
        type: DataTypes.STRING(13)
    },
    qqNumber: {
        type: DataTypes.STRING(15)
    }
    
}

console.log('已载入 -- Feedback模型')

const Feedback = sequelize.define('Feedback', initOptions, {
    freezeTableName: true
})



export { Feedback, initOptions } 