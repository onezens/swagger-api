/**
 * Created by wangzhen on 16/11/26.
 */
const express = require('express');
const path = require('path');
const sha1 = require('sha1');

const router = express.Router();
const usersModel = require('../model/users');
const checkNotLogin = require('../middlewares/check.js').checkNotLogin;

//GET 获取注册页
router.get('/', checkNotLogin, function(req, res, next){
    res.render('signup');
});

//POST 提交注册信息
router.post('/', checkNotLogin, function(req, res, next){
    console.log(req.sessionID);
    var name = req.fields.name.trim();
    var password = req.fields.password.trim();
    var repassword = req.fields.repassword.trim();
    try {
        //名字请限制在 2-10 个字符
        if (name.length < 2 || name.length > 18) {
            throw new Error('名字请限制在 2-18 个字符');
        }
        ;
        //密码请限制在 6-20 个字符
        if (password.length < 6 || password.length > 18) {
            throw new Error('密码请限制在 6-18 个字符');
        }
        //两次输入密码不一致
        if (password != repassword) {
            throw new Error('两次输入密码不一致');
        }

    }catch (error){
        req.flash('error', error.message);
        return res.redirect('/signup');
    }
    //加密
    console.log(password);
    password = sha1(password);
    console.log(password);

    var user = {
        name : name,
        password: password
    }

    usersModel.signup(user, function(error,user){
        if (error){
            console.log(error.message.code);
            // 用户名被占用则跳回注册页，而不是错误页
            if (error.message.match('ER_DUP_ENTRY')) {
                req.flash('error', '用户名已被占用');
                return res.redirect('/signup');
            }
            next(error);
        }else{
            delete user.password;
            req.session.user = user;
            req.flash('success', '注册成功!');
            res.redirect('/');
        }
    });

});

module.exports = router;
