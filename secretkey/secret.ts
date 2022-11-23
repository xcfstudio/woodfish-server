import fs from 'fs'
import path from 'path'

const secretKeys = {
    secretKey: '',
    publicKey: ''
}

const writeInfo = () => {
    secretKeys.secretKey = fs.readFileSync(path.resolve(__dirname, './rsa_private_key.pem')).toString()
    secretKeys.publicKey = fs.readFileSync(path.resolve(__dirname, './rsa_public_key.pub')).toString()
    console.log('已载入 -- 密钥对')
}

writeInfo()

export {secretKeys}