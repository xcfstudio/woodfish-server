import Dto from "@/classes/Dto.class";

class UpScoreDto extends Dto {
    score: number
    secret: string 

    constructor(body: UpScoreDto) {
        super()
        this.score = body.score
        this.secret = body.secret
    }
}

export default UpScoreDto