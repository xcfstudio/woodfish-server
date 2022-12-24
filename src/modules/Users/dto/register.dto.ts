import Dto from '@/classes/Dto.class'
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator'

class RegisterDto extends Dto {
   
    @IsEmail()
    useremail: string
    // @IsPhoneNumber()
    userphone?: string
    @IsNotEmpty()
    password: string
    verifycode?: string

    // constructor(email: string, password: string, phone?: string, verifyCode?: string) {
    //     this.useremail = email
    //     this.password = password
    //     this.userphone = `+86${phone}`
    //     this.verifycode = verifyCode
    // }

    constructor(body: RegisterDto) {
        super()
        this.useremail = body.useremail
        this.password = body.password
        this.userphone = `+86${body.userphone}`
        this.verifycode = body.verifycode
    }
}

export default RegisterDto