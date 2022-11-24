import { Failure, Success } from "@/classes/BasicResponse.class";
import { UserAccount } from "@/models/UserAccount";
import { UserInfo } from "@/models/UserInfo";
import { Middleware } from "koa";

const getUserInfo: Middleware = async ctx => {
    const uid = ctx.state.user.uid
    const res = await UserAccount.findOne({
        attributes: ['username', 'useremail', 'userphone'],
        where: {
            uid
        },
        // 联表查询
        include: [{
            model: UserInfo,
            attributes: ['avatar', 'qqnumber', 'realname', 'gender', 'birthday', 'age']
        }]
    })
    
    if (res) {
        const j_res = res?.toJSON()
        // 整理下结构
        const t = j_res.UserInfo
        const r = {...j_res, ...t}
        delete r.UserInfo
        ctx.body = new Success('成功', r)
        return
    }
    ctx.body = new Failure('用户不存在！')
 
}

export default getUserInfo