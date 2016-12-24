/**
 * Created by wangzhen on 16/11/26.
 */
const express = require('express');
const sha1 = require('sha1');
const config = require('config-lite');

const router = express.Router();
const checkNotLogin = require('../middlewares/check.js').checkNotLogin;
const usersModel = require('../model/users');

//GET 获取登录页
router.get('/', checkNotLogin, function(req, res, next){
    res.render('signin');
});

//POST 提交登录信息
router.post('/', checkNotLogin, function(req, res, next){

    var name = req.fields.name.trim();
    var password = req.fields.password.trim();
    usersModel.signin(name, function(error, user){
        if(error){
            req.flash('error', 'sys error!');
            return res.redirect('/signin');
        }else {
            if(name.length ==0 || password.length ==0){
                req.flash('error', '用户名或者密码不能为空!');
                return res.redirect('/signin');
            }

            if(!user){
                req.flash('error', '用户不存在!');
                console.log('user not exist');
                return res.redirect('/signin');
            }
            //检查密码
            if(sha1(password) != user.password){
                req.flash('error', '密码错误!');
                console.log('password error');
                return res.redirect('back');
            }

            //登录确认 数据库 isAllow 字段 1
            if(config.confirmSwitch && !user.isAllow){
                req.flash('success', '登录成功!正在等待管理员的登录确认......');
                return res.redirect('back');
                return;
            }

            delete user.password;
            req.session.user = user;
            req.flash('success', '登录成功!');
            return res.redirect('/');
        }
    });
});

module.exports = router;


