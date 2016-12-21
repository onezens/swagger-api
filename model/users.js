/**
 * Created by wangzhen on 16/11/29.
 */
const mysql = require('../lib/mysql');
const connection = mysql.connection;

function signup(user, cb){
    var query = `insert into users(name, password) values('${user.name}', '${user.password}')`;
    console.log(query);
    connection.query(query, function(err, rows, fields) {
        if(err) {
            cb(err);
            return;
        }
        cb(null, user);
    });
}

function signin(name, cb) {
    var query = `select * from users where name = '${name}'`;
    console.log(query);
    connection.query(query, function(err, rows, fields){
        if (err){
            cb(err);
            return;
        }
        var result = rows[0];
        if(!result) {
            cb(null, null);
        }else{
            var user = {
                name: result.name,
                password: result.password,
                isAllow: result.isAllow
            }
            cb(null, user);
        }
    });
}

module.exports.signin = signin;
module.exports.signup = signup;