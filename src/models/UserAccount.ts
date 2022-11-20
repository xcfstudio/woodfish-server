import { DataTypes, Model } from "sequelize"
import sequelize from "@/core/ORM/sequelize"
import { hashSync } from "@/utils/hash"
import { user_config } from "config/user"

class UserAccount extends Model {}


UserAccount.init({
    uid: {
        type: DataTypes. STRING(user_config.uidLength),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    username: {
        type: DataTypes.STRING(user_config.uidLength+8),
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
    }
}, {
    sequelize,
    modelName: 'UserAccount'
})

export default UserAccount