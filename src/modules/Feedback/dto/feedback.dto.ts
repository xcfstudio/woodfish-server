import Dto from "@/classes/Dto.class";
import { IsString, MaxLength } from "class-validator";

class FeedbackDto extends Dto {
    @IsString()
    @MaxLength(500)
    issue: string

    
    telNumber?: string
   
    qqNumber?: string

    constructor(body: FeedbackDto) {
        super()
        this.issue = body.issue
        this.telNumber = body.telNumber
        this.qqNumber = body.qqNumber
    }
}

export default FeedbackDto