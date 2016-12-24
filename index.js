/**
 * Created by wangzhen on 16/12/7.
 */

const express = require('express');
const flash = require('connect-flash');
const config = require('config-lite');
const session = require('express-session');
const pkg = require('./package.json');
const path = require('path');
const route = require('./routes');
const mysql = require('./lib/mysql.js');

const app = express();
//设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置静态文件
app.use('/src',express.static(path.join(__dirname, 'src')));
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
app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    //uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));

//全部变量
app.locals.api = {
    title: pkg.name,
    description: pkg.description
}

// 需要的变量
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.apiURL = '/src/api.json';
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
//设置路由
route(app);

app.listen(config.port, function(){
    console.log(pkg.name + ' start success, listen on port ' + config.port);
    mysql.initDataBase();
});