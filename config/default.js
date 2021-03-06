/**
 * Created by wangzhen on 16/12/7.
 */

module.exports = {
    port: 3000,
    session: {
        secret: 'swagger-api',
        key: 'swagger-api',
        maxAge: 2592000000
    },
    confirmSwitch: false,
    mongodb: 'mongodb://localhost:27017/myblog',
    host: '127.0.0.1:3000',
    scheme : 'http',
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database:'mydb'
    }
};
