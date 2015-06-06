var dbHelper = require('./dbHelper.js');

exports.queryAllServices = queryAllServices;
exports.queryAllItems = queryAllItems;
exports.queryAllStaff = queryAllStaff;
exports.queryAllCards = queryAllCards;
exports.queryAllMembers = queryAllMembers;
exports.queryAllappointment = queryAllappointment;
exports.queryAllJieSuan = queryAllJieSuan;

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

function queryAllItems(enterpriseId, callback){
    var sql = "select * from items where ?";
    dbHelper.execSql(sql, {enterprise_id:enterpriseId}, function(err, data){
        if(err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

function queryAllStaff(enterpriseId, callback){
    var sql = "select * from staff where ?";
    dbHelper.execSql(sql, {enterprise_id:enterpriseId}, function(err, data){
        if(err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

function queryAllCards(enterpriseId, callback){
    var sql = "select * from cards where ?";
    dbHelper.execSql(sql, {enterprise_id:enterpriseId}, function(err, data){
        if(err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

function queryAllMembers(enterpriseId, callback){
    var sql = "select * from members where ?";
    dbHelper.execSql(sql, {enterprise_id:enterpriseId}, function(err, data){
        if(err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

function queryAllappointment(enterpriseId, callback){
    var sql = "select * from appointments where ?";
    dbHelper.execSql(sql, {enterprise_id:enterpriseId}, function(err, data){
        if(err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

function queryAllJieSuan(enterpriseId, callback){
    var sql = "select * from jiesuan where ?";
    dbHelper.execSql(sql, {enterprise_id:enterpriseId}, function(err, data){
        if(err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}