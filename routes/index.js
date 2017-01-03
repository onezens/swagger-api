/**
 * Created by wangzhen on 16/12/10.
 */

const express = require('express');
const router = express.Router();
const config = require('config-lite');
const apiJson = require('../api.json');
apiJson.host = config.host;
apiJson.schemes[0] = config.scheme;

module.exports = function(app){
    app.get('/',function(req,  res){
        if(req.session.user){
            res.render('api');
        }else{
            res.redirect('/signin');
        }
    });
    app.use('/getApiURL', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        if (req.session.user){
            res.end(JSON.stringify(apiJson));
        }else{
            res.end(JSON.stringify({}));
        }
    });

    app.use('/v1', require('./api/index'));
    app.use('/signin', require('./site/signin'));
    app.use('/signup', require('./site/signup'));
    app.use('/signout', require('./site/signout'));
    app.use(function (req, res) {
        res.statusCode = 404;
        if (!res.headersSent) {
            res.render('404');
        }
    });
};