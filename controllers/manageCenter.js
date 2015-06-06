var dbHelper = require('../lib/dbHelper.js');
var dbDAO = require('../lib/dbDAO.js');
var uuid = require('uuid');
var async = require('async');
var _ = require('underscore');

exports.init = init;
exports.itemManagement = itemManagement;
exports.addNewCate = addNewCate;
exports.updateCate = updateCate;
exports.deleteCate = deleteCate;
exports.addItem = addItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.staffManagement = staffManagement;
exports.addStaff = addStaff;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;
exports.cardManagement = cardManagement;
exports.addCard = addCard;
exports.deleteCard = deleteCard;
exports.updateCard = updateCard;
exports.memberManagement = memberManagement;
exports.addMember = addMember;
exports.deleteMember = deleteMember;
exports.updateMember = updateMember;
exports.financialFlow = financialFlow;

function init(req, res, next){
    res.render('manager');
}

function itemManagement(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    async.series([_queryAllServices, _queryAllItems], function(error,result){
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
        res.render("m_item", {cates: services});
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

function addItem(req, res, next){
    var id = uuid.v1();
    var itemName = req.body.itemName;
    var itemPrice = req.body.itemPrice;
    var picUrl = req.body.picUrl;
    var serviceName = req.body.serviceName;
    var serviceId = req.body.serviceId;
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var sql = "insert into items set ?";
    var options = {
        id: id,
        name: itemName,
        price: itemPrice,
        pic_url: picUrl,
        service_id: serviceId,
        service_name: serviceName,
        enterprise_id: enterprise_id
    };
    dbHelper.execSql(sql, options, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function updateItem(req, res, next){
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;
    var sql = "update items set name=?, price=? where id=?";
    dbHelper.execSql(sql, [name, price, id], function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function deleteItem(req, res, next){
    var id = req.params['id'];
    var sql = 'delete from items where ?';
    dbHelper.execSql(sql, {id:id}, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    })
}

function staffManagement(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    dbDAO.queryAllStaff(enterprise_id, function(err, data){
        if(err) return next(err);
        _.each(data, function(d){
            d.datetime = new Date(d.join_time);
            d.join_time = new Date(parseInt(d.join_time)).toLocaleString().substr(0,10);
        });
        res.render("m_staff", {staffs: data});
    });
}

function addStaff(req, res, next){
    var id = uuid.v1();
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var name = req.body.name;
    var gender = (req.body.gender=="male")?"男":"女";
    var mobilePhone = req.body.mobilePhone;
    var joinTime = req.body.joinTime;
    var sql = "insert into staff set ?";
    dbHelper.execSql(sql, {id:id, name:name, mobile_phone:mobilePhone, gender:gender, join_time:joinTime, enterprise_id:enterprise_id}, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function updateStaff(req, res, next){
    var id = req.body.id;
    var name = req.body.name;
    var gender = (req.body.gender=="male")?"男":"女";
    var mobilePhone = req.body.mobilePhone;
    var joinTime = req.body.joinTime;
    var sql = "update staff set name=?,mobile_phone=?,gender=?,join_time=? where id=?";
    dbHelper.execSql(sql, [name, mobilePhone, gender, joinTime, id], function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function deleteStaff(req, res, next){
    var id = req.params["id"];
    var sql = "delete from staff where ?";
    dbHelper.execSql(sql, {id:id}, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function cardManagement(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    dbDAO.queryAllCards(enterprise_id, function(err, data){
        if(err) return next(err);
        _.each(data, function(d){
            d.datetime = new Date(d.expire_time);
            d.expire_time = new Date(parseInt(d.expire_time)).toLocaleString().substr(0,10);
        });
        res.render("m_card", {cards: data});
    });
}

function addCard(req, res, next){
    var id = uuid.v1();
    var name = req.body.name;
    var price = req.body.price;
    var discount = req.body.discount;
    var expire_time = Date.parse(req.body.expireTime);
    var card_type = req.body.cardType;
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var sql = "insert into cards set ?";
    var options = {
        id: id,
        name: name,
        discount: discount,
        card_type: card_type,
        price: price,
        expire_time: expire_time,
        enterprise_id: enterprise_id
    };
    dbHelper.execSql(sql, options, function(err,data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });

}

function deleteCard(req, res, next){
    var id = req.params["id"];
    var sql = "delete from cards where ?";
    dbHelper.execSql(sql, {id:id}, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function updateCard(req, res, next){
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;
    var discount = req.body.discount;
    var expire_time = Date.parse(req.body.expireTime);
    var card_type = req.body.cardType;
    var sql = "update cards set name=?,discount=?,card_type=?,price=?,expire_time=? where id=?";
    dbHelper.execSql(sql, [name,discount,card_type,price,expire_time,id], function(err,data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function memberManagement(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var card_sql = "select * from cards where ?";
    var member_sql = "select * from members where ?";
    dbHelper.execSql(card_sql, {enterprise_id: enterprise_id}, function(err, data){
        if(err) return next(err);
        dbHelper.execSql(member_sql, {enterprise_id: enterprise_id}, function(error, datas){
            if(error) return next(error);
            _.each(datas, function(d){
                d.datetime = new Date(d.apply_date);
                d.apply_date = new Date(parseInt(d.apply_date)).toLocaleString().substr(0,10);
            });
            res.render("m_member", {cards: data, members: datas});
        });
    });
}

function addMember(req, res, next){
    var id = uuid.v1();
    var name = req.body.name;
    var gender = req.body.gender;
    var mobilePhone = req.body.mobilePhone;
    var cardName = req.body.cardName;
    var applyDate = req.body.applyDate;
    var card_discount = req.body.cardDiscount;
    var card_price = req.body.cardPrice;
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var sql = "insert into members set ?";
    var options = {
        id: id,
        name: name,
        mobile_phone: mobilePhone,
        gender: gender,
        card_name: cardName,
        card_discount: card_discount,
        card_price: card_price,
        apply_date: applyDate,
        consume_count: 0,
        enterprise_id: enterprise_id
    };
    dbHelper.execSql(sql, options, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });

}

function deleteMember(req, res, next){
    var id = req.params["id"];
    var sql = "delete from members where ?";
    dbHelper.execSql(sql, {id:id}, function(err, data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function updateMember(req, res, next){
    var id = req.body.id;
    var name = req.body.name;
    var gender = req.body.gender;
    var mobilePhone = req.body.mobilePhone;
    var applyDate = req.body.applyDate;
    var sql = "update members set name=?,gender=?,apply_date=?,mobile_phone=? where id=?";
    dbHelper.execSql(sql, [name,gender,applyDate,mobilePhone,id], function(err,data){
        if(err) return next(err);
        res.json({code:0,result:{msg:"success!"}});
    });
}

function financialFlow(req, res, next){
    var enterprise_id = req.session.enterprise_id || "1061da40-f155-11e4-ae55-173d1f3c";
    var flows = [];
    async.series([_queryAllMember, _queryAllJieSuan, _buildData], function(error, result){
        if(error) return next(error);
        res.render("m_flow", {flows: flows});
    });
    function _queryAllMember(callback){
        dbDAO.queryAllJieSuan(enterprise_id, function(error, datas){
            if (error) {
                callback(error);
                return;
            }

            _.each(datas, function(data, index){
                var sql = "select * from jiesuan_item where jiesuan_id=?";
                dbHelper.execSql(sql, [data.id], function(err, d){
                    if(err){
                        callback(err);
                        return;
                    }
                    var items = _.pluck(d, "item_name");
                    flows.push({type: "收银结算", price:data.sum_money, content:items, time: (new Date(data.pay_time)).toLocaleString().substr(0,10)});
                });
            });
            callback(null);
        });
    }
    function _queryAllJieSuan(callback){
        dbDAO.queryAllMembers(enterprise_id, function(error, datas){
            if (error) {
                callback(error);
                return;
            }
            _.each(datas, function(data, index){
                flows.push({type: "办理会员", price: data.card_price, content: data.card_name, time: (new Date(data.apply_date)).toLocaleString().substr(0,10)});
            });
            callback(null);
        });
    }
    function _buildData(callback){
        flows = _.sortBy(flows,"time");
        _.each(flows, function(flow, index){
            flow.index = ++index
            if(index%2==0){
                flow.color = "active";
            }
            else{
                flow.color = "default";
            }
        });
        callback(null);
    }
}
