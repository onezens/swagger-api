
const express = require('express');
const router = express.Router();

const resJson = {
    code : 0,
    message : 'no content',
    fields : null
};

router.get('/', function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(resJson));
});

router.use('/pets', require('./pet'));
router.use('/stores', require('./store'));
router.use('/users', require('./user'));


module.exports = router;