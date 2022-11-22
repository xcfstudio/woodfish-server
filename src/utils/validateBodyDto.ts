import Dto from "@/classes/Dto.class";
import { validate } from "class-validator";

const validateBodyDto = async (dto: Dto): Promise<false|any[]> => {

    try {
        const err: any[] = await validate(dto)
        const t_err: any[] = []
        err.forEach(v => {
            delete v.target
            t_err.push(v)
        })
        if (err.length) {
            return t_err
        }
        return false
    } catch (error: any) {
        return [error]
    }
}

export default validateBodyDto