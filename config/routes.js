var Index = require('../controllers/index');
var User = require('../controllers/user');

module.exports = function(app){

    app.get('/', User.signinRequired, Index.index);

    app.get('/signin', User.signin);
    app.get('/signup', User.signup);
    app.post('/signin', User.signin);
    app.post('/signup', User.signup);


    app.use(function(req, res){
        res.status(404);
        res.render('404');
    });
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });
    
};
