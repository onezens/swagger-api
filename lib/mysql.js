
const mysql = require('mysql');
const config = require('config-lite');

var connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

function initDataBase() {
    var createTableQuery = '';
    createTableQuery += 'create table if not exists users(uid integer primary key auto_increment, name varchar(18) not null unique, password varchar(18) not null, sid varchar(20), createtime timestamp not null default current_timestamp, isAllow tinyint(1) default 0) auto_increment=100000;';

    connection.query(createTableQuery, function(err, rows, fields) {
        if (err) throw err;
        console.log('init mysql database success!');
    });
    //关闭连接
    //connection.end();
}

module.exports.connection = connection;
module.exports.initDataBase = initDataBase;

