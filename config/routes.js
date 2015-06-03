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
    app.post('/manageCenter/addItem', Manager.addItem);
    app.post('/manageCenter/updateItem', Manager.updateItem);
    app.get('/manageCenter/deleteItem/:id', Manager.deleteItem);
    app.get('/manageCenter/staffManagement', Manager.staffManagement);
    app.post('/manageCenter/addStaff', Manager.addStaff);
    app.post('/manageCenter/updateStaff', Manager.updateStaff);
    app.get('/manageCenter/deleteStaff/:id', Manager.deleteStaff);
    app.get('/manageCenter/cardManagement', Manager.cardManagement);
    app.post('/manageCenter/addCard', Manager.addCard);
    app.get('/manageCenter/deleteCard/:id', Manager.deleteCard);
    app.post('/manageCenter/updateCard', Manager.updateCard);


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
                return '/uploads/' + now;
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
