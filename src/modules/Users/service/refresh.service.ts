import { Failure, Success } from "@/classes/BasicResponse.class";
import { UserAccount } from "@/models/UserAccount";
import { generateToken } from "@/modules/Users/utils/generateToken";
import { Middleware } from "koa";
import { security_config } from 'config/security'
import { sha256BasedCrypt } from "@/utils/hash";

const refreshToken: Middleware = async ctx => {
    const res = await UserAccount.findOne({
        attributes: ['status', 'username', 'uid', 'password'],
        where: {
            uid: ctx.state.user.uid
        }
    })
    if (res) {
        if (res.toJSON().status !== 'Y') {
            ctx.body = new Failure('Account blocked!')
            return
        }

        const j = res.toJSON()
        const s = sha256BasedCrypt(j.password)
        j.secret = s
        delete j.password



        ctx.body = new Success('Refresh token success!', {...res?.toJSON(), ...generateToken(j), exptime: security_config.tokenExp})
        return
    }
    ctx.body = new Failure('Account exceotion!')
    
}

export default refreshToken