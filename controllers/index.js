var dbHelper = require('../lib/dbHelper.js');
var dbDAO = require('../lib/dbDAO.js');
var uuid = require('uuid');
var async = require('async');
var _ = require('underscore');

exports.index = index;
exports.getItemsByServiceId = getItemsByServiceId;
exports.addJieSuan = addJieSuan;

function index(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    async.series([_queryAllServices, _queryAllItems, _queryAllMembers, _queryAllStaff], function(error,result){
        if(error) return next(error);
        var services = result[0];
        var items = result[1];
        var newItem = [];
        _.each(services, function(service,index){
            newItem = _.filter(items, function(item){
                return item.service_id == service.id;
            });
            services[index].hasItems = newItem;
        });
        console.log(result[2]);
        res.render("index", {cates: services, items:services[0].hasItems, members:result[2], staffs:result[3]});
    });
    function _queryAllServices(callback){
        dbDAO.queryAllServices(enterprise_id, function(error, data){
            if (error) {
                callback(error);
                return;
            }

            callback(null, data);
        });
    }
    function _queryAllItems(callback){
        dbDAO.queryAllItems(enterprise_id, function(error, data){
            if (error) {
                callback(error);
                return;
            }

            callback(null, data);
        });
    }
    function _queryAllMembers(callback){
        dbDAO.queryAllMembers(enterprise_id, function(error, data){
            if (error) {
                callback(error);
                return;
            }

            callback(null, data);
        });
    }
    function _queryAllStaff(callback){
        dbDAO.queryAllStaff(enterprise_id, function(error, data){
            if (error) {
                callback(error);
                return;
            }

            callback(null, data);
        });
    }
}

function addJieSuan(req, res, next){
    var id = uuid.v1();
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var type = req.body.type;
    var member_name = req.body.member_name;
    var member_id = req.body.member_id;
    var sum_money = req.body.sum_money;
    var items = req.body.items;
    var pay_type = req.body.pay_type;
    var pay_time = Date.parse(new Date());
    var staff_name = req.body.staff_name;
    var staff_id = req.body.staff_id;
    var tc_money = req.body.tc_money;
    var options = {
        id:id,
        type:type,
        member_name:member_name,
        member_id:member_id,
        sum_money:sum_money,
        staff_name:staff_name,
        staff_id:staff_id,
        tc_money:tc_money,
        pay_type:pay_type,
        pay_time:pay_time,
        enterprise_id:enterprise_id
    };
    var sql = "insert into jiesuan set ?";
    var jiesuan_item_sql = "insert into jiesuan_item set ?";
    dbHelper.execSql(sql, options, function(err, data){
        if(err) return next(err);
        for(var i=0;i<items.length;i++){
            dbHelper.execSql(jiesuan_item_sql, {id:uuid.v1(), item_name:items[i].name, item_id:items[i].id, jiesuan_id:id, enterprise_id:enterprise_id}, function(e, d){
                if(e) return next(e);

            });
        }
        if(type == "会员"){
            var u_sql = "update members set consume_count=consume_count+1 where id=?";
            dbHelper.execSql(u_sql, [member_id], function(error, dt){
                if(error) return next(error);
            });
        }
        res.json({code:0,result:{msg:"success"}});
    });
}

function getItemsByServiceId(req, res, next){
    var serice_id = req.params["id"];
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var sql = "select * from items where service_id=? and enterprise_id=?";
    dbHelper.execSql(sql, [serice_id, enterprise_id], function(err, data){
        if(err) return next(err);
        res.json({code:0, result:data});
    })
}
