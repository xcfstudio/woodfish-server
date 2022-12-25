// MySQL配置文件
import dayjs from 'dayjs'
import fs from 'fs'
import path from 'path'
const logPath = path.resolve(__dirname, '../', 'logs', 'sql.log')
const sqlLogStream = fs.createWriteStream(logPath, {flags: 'a'})

const mysql_config = {
    port: 3306,
    host: '127.0.0.1',
    username: 'root',
    password: '123456',
    database: 'woodfish',
    logging: (log:any) => {
        sqlLogStream.write(dayjs().format('YYYY:MM:DD:HH:mm:ss')+': '+log+'\n')
    }
}

export {
    mysql_config as config
}