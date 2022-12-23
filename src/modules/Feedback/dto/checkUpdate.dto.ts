import Dto from "@/classes/Dto.class";
import { IsString } from "class-validator";

class CheckUpdateDto extends Dto {
    @IsString()
    platform: string
    @IsString()
    version: string

    constructor(body: CheckUpdateDto) {
        super()
        this.platform = body.platform
        this.version = body.version
    }
}

export default CheckUpdateDto