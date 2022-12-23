import { Failure, Success } from "@/classes/BasicResponse.class";
import { AppVersion } from "@/models/AppVersion";
import validateBodyDto from "@/utils/validateBodyDto";
import { Middleware } from "koa";
import CheckUpdateDto from "../dto/checkUpdate.dto";

const checkUpdate: Middleware = async ctx => {
    const body = ctx.body as CheckUpdateDto
    const err = await validateBodyDto(new CheckUpdateDto(body))
    if (err) {
        ctx.body = new Failure('validate error!', {}, err)
        return
    }

    const res = (await AppVersion.findOne({
        where: {
            platform: body.platform
        }
    }))?.toJSON()

    const resp_obj_new = new Success('有新版本', {
        update: true,
        link: res.link,
        version: res.version,
        details: res.details,
        date: res.date
    })
    const resp_obj_none = new Success('当前版本已最新', {
        update: false
    })

    if (res && res.version) {
        let versionArr_client:any = []
        let versionArr_server:any = []
        try {
            versionArr_client = body.version.split('.')
            versionArr_server = res.version.split('.')
        } catch (error) {
            ctx.body = resp_obj_none
            return
        }
        if (versionArr_client[0] < versionArr_server[0]) {
            ctx.body = resp_obj_new
            return
        }
        if (versionArr_client[1] < versionArr_server[1]) {
            ctx.body = resp_obj_new
            return
        }
        if (versionArr_client[2] < versionArr_server[2]) {
            ctx.body = resp_obj_new
            return
        }
        ctx.body = resp_obj_none
        return
    }
    ctx.body = resp_obj_none
}

export default checkUpdate