exports.signin = signin;
exports.signinRequired = signinRequired;

function signin(req, res){
    res.render('signin');
}

function signinRequired(req, res, next){
    var user = req.session.user;

    if(!user){
        return res.redirect(303,'/signin');
    }
    next();
}