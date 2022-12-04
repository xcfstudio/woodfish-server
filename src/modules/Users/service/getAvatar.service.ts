import { Failure, Success } from "@/classes/BasicResponse.class";
import { UserAccount } from "@/models/UserAccount";
import { UserInfo } from "@/models/UserInfo";
import { getAccountType } from "@/utils/verifyRegex";
import { Middleware } from "koa";

const getAvatarService: Middleware = async ctx => {
    const { id } = ctx.params
    const accountType = getAccountType(id)
    if (!accountType) {
        ctx.body = new Failure('not a account')
        return
    }



    // 数据库字段映射表
    const mirror = {
        email: 'useremail',
        phone: 'userphone',
        name: 'username',
        uid: 'uid'
    }

    interface VerifyResult {
        username: string
        uid: string
        password: string
        status: string
        role?: string
    }

    const res = await UserAccount.findOne({
        attributes: [],
        where: {
            [mirror[accountType]]: id
        },
        include: [
            {
                model: UserInfo,
                attributes: ['avatar']
            }
        ]
    })

    const avatar = res?.toJSON().UserInfo.avatar || null
    ctx.body = new Success('done', {avatar})
}

export default getAvatarService