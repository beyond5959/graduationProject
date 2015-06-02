var dbHelper = require('./dbHelper.js');

exports.queryAllServices = queryAllServices;

function queryAllServices(enterpriseId, callback){
    var sql = "select * from services where ?";
    dbHelper.execSql(sql, {enterprise_id:enterpriseId}, function(err, data){
        if(err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

