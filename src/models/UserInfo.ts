import { DataTypes, Model, ModelAttributes, STRING } from "sequelize"
import sequelize from "@/core/ORM/sequelize"
import { user_config } from "config/user"

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
    avatar: {
        type: STRING,
        defaultValue: "https://s1.ax1x.com/2022/12/06/z62mSx.jpg"
    },
    qqNumber: {
        type: STRING(20)
    },
    realName: {
        type: DataTypes.STRING(10)
    },
    gender: {
        type: DataTypes.STRING(10)
    },
    birthday: {
        type: DataTypes.DATE
    },
    age: {
        type: DataTypes.INTEGER
    },
    province: {
        type: DataTypes.STRING(15)
    },
    city: {
        type: DataTypes.STRING(15)
    },
    longitude: {
        type: DataTypes.DOUBLE
    },
    latitude: {
        type: DataTypes.DOUBLE
    }
}

console.log('已载入 -- UserInfo模型')

const UserInfo = sequelize.define('UserInfo', initOptions, {
    freezeTableName: true
})

export { UserInfo, initOptions } 