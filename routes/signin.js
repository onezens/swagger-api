/**
 * Created by wangzhen on 16/11/26.
 */
const express = require('express');
const sha1 = require('sha1');

const router = express.Router();
const checkNotLogin = require('../middlewares/check.js').checkNotLogin;
const usersModel = require('../model/users');

//GET 获取登录页
router.get('/', checkNotLogin, function(req, res, next){
    res.render('signin');
});

//POST 提交登录信息
router.post('/', checkNotLogin, function(req, res, next){
    console.log(req.fields);
    var name = req.fields.name.trim();
    var password = req.fields.password.trim();
    usersModel.signin(name, function(error, user){
        if(error){

        }else {
            if(!user){
                req.flash('error', '用户不存在!');
                return res.redirect('back');
            }
            //检查密码
            if(sha1(password) != user.password){
                req.flash('error', '密码错误!');
                return res.redirect('back');
            }
            req.flash('success', '登录成功!');
        }
    });
    //users.getUserByName(name).then(function(user){

    //

    //
    //    delete user.password;
    //    req.session.user = user;
    //    res.redirect('/posts');
    //}).catch(function(error){
    //    console.log(error);
    //    next(error);
    //});
});

module.exports = router;


