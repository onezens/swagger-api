const express = require('express');
const sha1 = require('sha1');
const config = require('config-lite');
const fs = require('fs');
const path = require('path');

const router = express.Router();


router.post('/',function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.fields));
});

router.post('/upload',function(req, res, next){
    var fileUrl = config.scheme + "://" + config.host + "/src/img/" + path.basename(req.files.avatar.path);
    var resObj = {
        status: 0,
        message: 'success',
        url: fileUrl,
        userName: req.fields.username
    };
    console.log(JSON.stringify(resObj));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(resObj));
});

router.post('/createWithArray',function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.fields));
});

router.post('/createWithList',function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.fields));
});
router.get('/login',function(req, res, next){
    console.log(req.query);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.query));

});
router.get('/logout',function(req, res, next){
    console.log(req.query);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.query));
});
router.delete('/:userName',function(req, res, next){
    console.log(req.params.userName);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.params));
});
router.get('/:userName',function(req, res, next){
    console.log(req.params.userName);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.params));
});
router.put('/:userName',function(req, res, next){
    console.log(req.params.userName);
    console.log(req.fields);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.fields));
});

module.exports = router;