import { Failure, Success } from "@/classes/BasicResponse.class";
import { UserAccount } from "@/models/UserAccount";
import { generateToken } from "@/modules/Users/utils/generateToken";
import { Middleware } from "koa";
import { security_config } from 'config/security'

const refreshToken: Middleware = async ctx => {
    const res = await UserAccount.findOne({
        attributes: ['status', 'username', 'uid'],
        where: {
            uid: ctx.state.user.uid
        }
    })
    if (res) {
        if (res.toJSON().status !== 'Y') {
            ctx.body = new Failure('Account blocked!')
            return
        }

        ctx.body = new Success('Refresh token success!', {...res?.toJSON(), ...generateToken(res.toJSON()), exptime: security_config.tokenExp})
        return
    }
    ctx.body = new Failure('Account exceotion!')
    
}

export default refreshToken