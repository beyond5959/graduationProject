var dbHelper = require('../lib/dbHelper.js');
var uuid = require('uuid');
var bcrypt = require('bcrypt');
var async = require('async');
var SALT_WORK_FACTOR = 10;

exports.signin = signin;
exports.signup = signup;
exports.loginout = loginout;
exports.signinRequired = signinRequired;

function signin(req, res, next){
    if(req.route.stack[0].method == 'get') res.render('signin');
    else{
        var username = req.body.phoneMobile;
        var password = req.body.password;
        var sql = 'select * from user where ?';
        dbHelper.execSql(sql,{username: username},function(err, result){
            if(err) return next(err);
            if(result.length == 0 ){
                res.render('signin', {signinError: '用户名不存在'});
            }else{
                bcrypt.compare(password, result[0].password, function(err, isMatch){
                    if(err) return next(err);
                    if(isMatch) {
                        req.session.enterprise_id = result[0].id;
                        req.session.username = username;
                        return res.redirect(303, '/');
                    }else{
                        res.render('signin', {signinError: '密码错误'});
                    }
                });
            }
        });
    }
}

function signup(req, res, next){
    if(req.route.stack[0].method == 'get') res.render('signup');
    else{
        var username = req.body.phoneMobile;
        var password = req.body.password;
        var signup_time = Date.parse(new Date);
        var id = uuid.v1();
        var sql = 'insert into user set ?';
        async.series([_encrypt, _execSql], function(err, results){
            if(err) return next(err);
            req.session.enterprise_id = id;
            req.session.username = username;
            return res.redirect(303, '/');
        });

        function _encrypt(callback){
            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if (err) {
                    callback(err);
                    return;
                }

                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    password = hash;
                    callback(null);
                });
            });
        }
        function _execSql(callback){
            dbHelper.execSql(sql,{id:id, username:username, password:password, signup_time:signup_time}, function(err,data){
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, data);
            });
        }
    }
}

function loginout(req, res, next){
    req.session.destroy(function (err) {
        if(err) console.log("session销毁失败.");
        else console.log("session被销毁.");
    });
    return res.redirect(303, '/signin');
}
function signinRequired(req, res, next){
    var user = req.session.enterprise_id;

    if(!user){
        return res.redirect(303,'/signin');
    }
    next();
}