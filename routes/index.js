/**
 * Created by wangzhen on 16/12/10.
 */

const express = require('express');
const router = express.Router();
const apiJson = require('../api.json');

module.exports = function(app){
    app.get('/',function(req,  res){
        res.render('api');
        //if(req.session.user){
        //    res.render('api');
        //}else{
        //    res.render('signin');
        //}

    });
    app.use('/getApiURL', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(apiJson));
    });

    app.use('/signin', require('./signin'));
    app.use('/signup', require('./signup'));
    app.use('/signout', require('./signout'));
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};