var Index = require('../controllers/index');
var User = require('../controllers/user');

module.exports = function(app){
    app.get('/', Index.index);

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
