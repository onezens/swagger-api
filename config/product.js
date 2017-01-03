module.exports = {
    port: 3037,
    session: {
        secret: 'swagger-api',
        key: 'swagger-api',
        maxAge: 2592000000
    },
    confirmSwitch: true,
    mongodb: 'mongodb://localhost:27017/myblog',
    host: 'api.onezen.cc',
    scheme: 'https',
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database:'mydb'
    }
};