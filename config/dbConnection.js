var mysql = require('mysql');

var options = {
    host: 'localhost',
    port: '3306',
    database: 'graduationProject',
    user: 'root',
    password: ''
};

exports.pool = mysql.createPool(options);