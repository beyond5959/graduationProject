var dbConnection = require('../config/dbConnection.js');

var pool = dbConnection.pool;

exports.execSql = execSql;

function execSql(sql, option, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log('与MySQL数据库建立连接失败。');
            callback(err);
        }
        else{
            connection.query(sql, option, function(err, rows){
                if(err){
                    console.log('数据操作失败');
                    callback(err);
                }
                else{
                    callback(null,rows);
                    connection.release();
                }
            });
        }
    });
}
