import Dto from "@/classes/Dto.class";
import { IsString, MaxLength } from "class-validator";

class FeedbackDto extends Dto {
    platform: string
    version: string

    constructor(body: FeedbackDto) {
        super()
        this.platform = body.platform
        this.version = body.version
    }
}

export default FeedbackDto