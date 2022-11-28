import Dto from "@/classes/Dto.class";
import { IsNotEmpty, IsString } from "class-validator";


class ChangePasswordDto extends Dto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string
    @IsNotEmpty()
    @IsString()
    newPassword: string

    constructor(body: ChangePasswordDto) {
        super()
        this.oldPassword = body.oldPassword
        this.newPassword = body.newPassword
    }
}

export default ChangePasswordDto