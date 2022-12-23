import { DataTypes, ModelAttributes } from "sequelize"
import sequelize from "@/core/ORM/sequelize"

// 用户反馈信息模型，存储用户个人信息相关数据

const initOptions: ModelAttributes = {
    tid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
        
    },
    platform: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    version: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publish: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    
    
}

console.log('已载入 -- AppVersion模型')

const AppVersion = sequelize.define('AppVersion', initOptions, {
    freezeTableName: true
})



export { AppVersion, initOptions } 