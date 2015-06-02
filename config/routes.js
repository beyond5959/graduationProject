var Index = require('../controllers/index');
var User = require('../controllers/user');
var Manager = require('../controllers/manageCenter');
var jqupload = require('jquery-file-upload-middleware');

module.exports = function(app){

    app.get('/', Index.index);  //User.signinRequired,

    app.get('/manageCenter', Manager.init);
    app.get('/manageCenter/itemManagement', Manager.itemManagement);
    app.get('/manageCenter/addCate/:newCate', Manager.addNewCate);
    app.post('/manageCenter/updateCate', Manager.updateCate);
    app.get('/manageCenter/deleteCate/:id', Manager.deleteCate);

    app.get('/signin', User.signin);
    app.get('/signup', User.signup);
    app.post('/signin', User.signin);
    app.post('/signup', User.signup);

    app.use('/upload', function(req, res, next){
        var now = Date.now();
        jqupload.fileHandler({
            uploadDir: function(){
                return __dirname + '/../public/uploads/' + now;
            },
            uploadUrl: function(){
                return '/Users/niuniu/git_local/graduationProject/public/uploads/' + now;
            }
        })(req, res, next);
    });

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
