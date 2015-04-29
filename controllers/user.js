exports.signin = signin;
exports.signup = signup;
exports.signinRequired = signinRequired;

function signin(req, res){
    res.render('signin');
}

function signup(req, res){
    res.render('signup');
}

function signinRequired(req, res, next){
    var user = req.session.user;

    if(!user){
        return res.redirect(303,'/signin');
    }
    next();
}