import { DataTypes, Model, ModelAttributes } from "sequelize"
import sequelize from "@/core/ORM/sequelize"
import { hashSync } from "@/utils/hash"
import { user_config } from "config/user"
import { UserInfo } from "./UserInfo"
import { GongdeScore } from "./GongdeScore"
import { Feedback } from "./Feedback"

// 用户账户模型，存储用户登陆相关数据

const initOptions: ModelAttributes = {
    uid: {
        type: DataTypes.STRING(user_config.uidLength),
        allowNull: false,
        primaryKey: true,

        unique: true
    },
    username: {
        type: DataTypes.STRING(user_config.uidLength + 8),
        allowNull: false,
        unique: true
    },
    useremail: {
        type: DataTypes.STRING(50),
        unique: true
    },
    userphone: {
        type: DataTypes.STRING(20),
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            this.setDataValue('password', hashSync(value))
        }
    },
    status: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: 'Y'
    }
}

const UserAccount = sequelize.define('UserAccount', initOptions, {
    freezeTableName: true
})


UserAccount.hasOne(UserInfo, {
    foreignKey: 'uid'
})

// UserAccount.hasOne(GongdeScore, {
//     foreignKey: 'uid'
// })

// UserAccount.hasOne(Feedback, {
//     foreignKey: 'uid'
// })

console.log('已载入 -- UserAccount模型')

export { UserAccount, initOptions } 