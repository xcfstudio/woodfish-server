import { Failure, Success } from "@/classes/BasicResponse.class";
import { Feedback } from "@/models/Feedback";
import validateBodyDto from "@/utils/validateBodyDto";
import { Middleware } from "koa";
import FeedbackDto from "../dto/feedback.dto";

const feedbackService: Middleware = async ctx => {
    const body = ctx.request.body as FeedbackDto
    const err = await validateBodyDto(new FeedbackDto(body))
    if (err) {
        ctx.body = new Failure('validate error!', {}, err)
        return
     }
     await Feedback.create({
        uid: ctx.state.user.uid,
        feedbackContent: body.issue,
        telNumber: body.telNumber,
        qqNumber: body.qqNumber
     })
     ctx.body = new Success('done', {})
}

export default feedbackService