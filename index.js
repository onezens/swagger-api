/**
 * Created by wangzhen on 16/12/7.
 */

const express = require('express');
const flash = require('connect-flash');
const config = require('config-lite');
const session = require('express-session');
const mysql = require('mysql');
const pkg = require('./package.json');
const path = require('path');

const app = express();

//设置静态文件
app.use('/src',express.static(path.join(__dirname, 'public')));
app.use('/api',express.static(path.join(__dirname, 'api')));

//设置session中间件
app.use(session({
    name: config.session.key,  //cookie 中  session id
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    }
}));

//使用flash中间件
//app.use(flash());

app.listen(config.port, function(){
    console.log(pkg.name + ' start success, listen on port ' + config.port);
});