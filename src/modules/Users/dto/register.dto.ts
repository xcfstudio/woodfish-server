import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator'

class RegisterDto {
   
    @IsEmail()
    @IsNotEmpty()
    useremail: string
    @IsPhoneNumber()
    userphone?: string
    @IsNotEmpty()
    password: string
    verifycode?: string

    constructor(email: string, password: string, phone?: string, verifyCode?: string) {
        this.useremail = email
        this.password = password
        this.userphone = `+86${phone}`
        this.verifycode = verifyCode
    }
}

export default RegisterDto