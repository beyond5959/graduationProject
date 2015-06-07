var Index = require('../controllers/index');
var User = require('../controllers/user');
var Manager = require('../controllers/manageCenter');
var jqupload = require('jquery-file-upload-middleware');
var Appointment = require('../controllers/appointment');


module.exports = function(app){

    app.get('/', Index.index);  //User.signinRequired,
    app.get('/index/getItemsByServiceId/:id', Index.getItemsByServiceId);
    app.post('/index/addJieSuan', Index.addJieSuan);

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
    app.get('/manageCenter/memberManagement', Manager.memberManagement);
    app.post('/manageCenter/addMember', Manager.addMember);
    app.get('/manageCenter/deleteMember/:id', Manager.deleteMember);
    app.post('/manageCenter/updateMember', Manager.updateMember);
    app.get('/manageCenter/financialFlow', Manager.financialFlow);
    app.get('/manageCenter/analysis', Manager.analysis);
    app.get('/manageCenter/queryAllJieSuanItem', Manager.queryAllJieSuanItem);
    app.get('/manageCenter/queryAllPayType', Manager.queryAllPayType);
    app.get('/manageCenter/queryAllYGTC', Manager.queryAllYGTC);
    app.get('/manageCenter/queryCustomerType', Manager.queryCustomerType);

    app.get('/appointment', Appointment.init);
    app.post('/appointment/addAppointment', Appointment.addAppointment);
    app.get('/appointment/queryAllappointment', Appointment.queryAllappointment);
    app.get('/appointment/deleteApp/:id', Appointment.deleteApp);


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
