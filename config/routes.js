var Index = require('../controllers/index');
var User = require('../controllers/user');
var Manager = require('../controllers/manageCenter');
var jqupload = require('jquery-file-upload-middleware');
var Appointment = require('../controllers/appointment');


module.exports = function(app){

    app.get('/', User.signinRequired, Index.index);  //
    app.get('/index/getItemsByServiceId/:id', User.signinRequired, Index.getItemsByServiceId);
    app.post('/index/addJieSuan', User.signinRequired, Index.addJieSuan);

    app.get('/manageCenter', User.signinRequired, Manager.init);
    app.get('/manageCenter/itemManagement', User.signinRequired, Manager.itemManagement);
    app.get('/manageCenter/addCate/:newCate', User.signinRequired, Manager.addNewCate);
    app.post('/manageCenter/updateCate', User.signinRequired, Manager.updateCate);
    app.get('/manageCenter/deleteCate/:id', User.signinRequired, Manager.deleteCate);
    app.post('/manageCenter/addItem', User.signinRequired, Manager.addItem);
    app.post('/manageCenter/updateItem', User.signinRequired, Manager.updateItem);
    app.get('/manageCenter/deleteItem/:id', User.signinRequired, Manager.deleteItem);
    app.get('/manageCenter/staffManagement', User.signinRequired, Manager.staffManagement);
    app.post('/manageCenter/addStaff', User.signinRequired, Manager.addStaff);
    app.post('/manageCenter/updateStaff', User.signinRequired, Manager.updateStaff);
    app.get('/manageCenter/deleteStaff/:id', User.signinRequired, Manager.deleteStaff);
    app.get('/manageCenter/cardManagement', User.signinRequired, Manager.cardManagement);
    app.post('/manageCenter/addCard', User.signinRequired, Manager.addCard);
    app.get('/manageCenter/deleteCard/:id', User.signinRequired, Manager.deleteCard);
    app.post('/manageCenter/updateCard', User.signinRequired, Manager.updateCard);
    app.get('/manageCenter/memberManagement', User.signinRequired, Manager.memberManagement);
    app.post('/manageCenter/addMember', User.signinRequired, Manager.addMember);
    app.get('/manageCenter/deleteMember/:id', User.signinRequired, Manager.deleteMember);
    app.post('/manageCenter/updateMember', User.signinRequired, Manager.updateMember);
    app.get('/manageCenter/financialFlow', User.signinRequired, Manager.financialFlow);
    app.get('/manageCenter/analysis', User.signinRequired, Manager.analysis);
    app.get('/manageCenter/queryAllJieSuanItem', User.signinRequired, Manager.queryAllJieSuanItem);
    app.get('/manageCenter/queryAllPayType', User.signinRequired, Manager.queryAllPayType);
    app.get('/manageCenter/queryAllYGTC', User.signinRequired, Manager.queryAllYGTC);
    app.get('/manageCenter/queryCustomerType', User.signinRequired, Manager.queryCustomerType);

    app.get('/appointment', User.signinRequired, Appointment.init);
    app.post('/appointment/addAppointment', User.signinRequired, Appointment.addAppointment);
    app.get('/appointment/queryAllappointment', User.signinRequired, Appointment.queryAllappointment);
    app.get('/appointment/deleteApp/:id', User.signinRequired, Appointment.deleteApp);


    app.get('/signin', User.signin);
    app.get('/signup', User.signup);
    app.post('/signin', User.signin);
    app.post('/signup', User.signup);
    app.get('/loginout', User.loginout);

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
