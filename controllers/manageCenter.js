var dbHelper = require('../lib/dbHelper.js');
var dbDAO = require('../lib/dbDAO.js');
var uuid = require('uuid');

exports.init = init;
exports.itemManagement = itemManagement;
exports.addNewCate = addNewCate;
exports.updateCate = updateCate;
exports.deleteCate = deleteCate;

function init(req, res, next){
    res.render('manager');
}

function itemManagement(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    dbDAO.queryAllServices(enterprise_id, function(error, data){
        if(error) return next(error);
        res.render("m_item", {cates:data});
    });
}

function addNewCate(req, res, next){
    var cateName = req.params['newCate'];
    var id = uuid.v1();
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var sql = "insert into services set ?";
    dbHelper.execSql(sql, {id:id, name:cateName, enterprise_id:enterprise_id}, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{id:id,name:cateName,enterprise_id:enterprise_id}});
    });
}

function updateCate(req, res, next){
    var id = req.body.id;
    var name = req.body.name;
    var sql = "update services set name=? where id=?";
    dbHelper.execSql(sql, [name, id], function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{id:id,name:name}});
    });
}

function deleteCate(req, res, next){
    var id = req.params['id'];
    var sql = "delete from services where ?";
    dbHelper.execSql(sql, {id:id}, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{id:id}});
    });
}
