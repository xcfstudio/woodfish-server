import Dto from "@/classes/Dto.class";
import { IsArray, IsNotEmpty } from "class-validator";

class LogoutDto extends Dto {
    @IsNotEmpty()
    @IsArray()
    token: string[]

    constructor(body: LogoutDto) {
        super()
        this.token = body.token
    }
}

export default LogoutDto