import Dto from "@/classes/Dto.class";
import { IsInt, IsString } from "class-validator";
import { threadId } from "worker_threads";

class UpdateUserInfoDto extends Dto {
    // @IsString()
    avatar?: string
    // @IsString()
    qqNumber?: string
    // @IsString()
    realName?: string
    // @IsString()
    gender?: string
    // @IsString()
    birthday?: string
    // @IsInt()
    age?: number
    // @IsString()
    province?: string
    // @IsString()
    city?: string

    username?: string

   
    constructor(body: UpdateUserInfoDto) {
        super()
       this.avatar = body.avatar
       this.qqNumber = body.qqNumber
       this.realName = body.realName
       this.gender = body.gender
       this.birthday = body.birthday
       this.age = body.age
       this.province = body.province
       this.city = body.city
    }
}

export default UpdateUserInfoDto