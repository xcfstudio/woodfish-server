import Dto from "@/classes/Dto.class"
import { IsNotEmpty, IsString } from "class-validator"

class LoginDto extends Dto {
    @IsNotEmpty()
    @IsString()
    account: string
    @IsNotEmpty()
    @IsString()
    password: string
    admin?: boolean
    verifycode?: string

    constructor(body: LoginDto) {
        super()
        this.account = body.account
        this.password = body.password
        this.verifycode = body.verifycode
        this.admin = body.admin
    }
}

export default LoginDto