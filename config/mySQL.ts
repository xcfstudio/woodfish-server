// MySQL配置文件

const mysql_config = {
    port: 3306,
    host: '127.0.0.1',
    username: 'root',
    password: '123456',
    database: 'woodfish',
    logging: true
}

export {
    mysql_config as config
}