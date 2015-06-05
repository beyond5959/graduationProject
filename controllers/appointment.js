var dbHelper = require('../lib/dbHelper.js');
var dbDAO = require('../lib/dbDAO.js');
var uuid = require('uuid');

exports.init = init;
exports.addAppointment = addAppointment;
exports.queryAllappointment = queryAllappointment;
exports.deleteApp = deleteApp;

function init(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    dbDAO.queryAllStaff(enterprise_id, function(err, data){
        if(err) return next(err);
        dbDAO.queryAllMembers(enterprise_id, function(error, datas){
            if(error) return next(error);
            res.render("appointment", {staffs:data, members: datas});
        });
    });
}

function addAppointment(req, res, next){
    var id = uuid.v1();
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var type = req.body.type;
    var name = req.body.name;
    var mobile_phone = req.body.mobilePhone;
    var staff = req.body.staff;
    var s_time = req.body.startTime;
    var e_time = req.body.endTime;
    var options = {
        id: id,
        name: name,
        type: type,
        mobile_phone: mobile_phone,
        staff: staff,
        s_time: s_time,
        e_time: e_time,
        enterprise_id: enterprise_id
    };
    var sql = "insert into appointments set ?";
    dbHelper.execSql(sql, options, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function queryAllappointment(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    dbDAO.queryAllappointment(enterprise_id, function(err, data){
        if(err) return next(err);
        res.json({code:0, result:data})
    });
}

function deleteApp(req, res, next){
    var id = req.params["id"];
    var sql = "delete from appointments where ?";
    dbHelper.execSql(sql, {id:id}, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}