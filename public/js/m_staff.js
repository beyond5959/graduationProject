var app = angular.module("app", []);
app.controller("mstaffCtrl", function($scope,$http) {

    $scope.staffData = {
        name:"",
        mobilePhone:"",
        gender:"",
        joinTime:"",
        doStaff:{
            id:"",
            name:"",
            mobilePhone:"",
            gender:"",
            joinTime:""
        }
    };

    function reload(modalName){
        window.location.href = window.location.href;
        $("." + modalName).modal('hide');
    }

    if(location.href.indexOf('manageCenter') != -1){
        $(".nav li:eq(2)").addClass("active");
    }

    $scope.sendInfo = function(id,name,mobiel_phone,gender,join_time){
        $scope.staffData.doStaff.id = id;
        $scope.staffData.doStaff.name = name;
        $scope.staffData.doStaff.mobilePhone = mobiel_phone;
        $scope.staffData.doStaff.gender = (gender == "男")?"male":"female";
        $scope.staffData.doStaff.joinTime = join_time;
        $("#staff_name").html(name);
    };
    $scope.updateStaff = function(){
        var options = {
            id: $scope.staffData.doStaff.id,
            name: $scope.staffData.doStaff.name,
            mobilePhone: $scope.staffData.doStaff.mobilePhone,
            gender: $scope.staffData.doStaff.gender,
            joinTime: Date.parse($scope.staffData.doStaff.joinTime)
        };
        $http.post("/manageCenter/updateStaff", options).success(function(data){
            reload("update-staff");
        });
    };
    $scope.deleteStaff = function(){
        $http.get("/manageCenter/deleteStaff/" + $scope.staffData.doStaff.id).success(function(data){
            reload("del-staff");
        });
    };
    $scope.addStaff = function(){

        var options = {
            name: $scope.staffData.name,
            mobilePhone: $scope.staffData.mobilePhone,
            gender: $scope.staffData.gender,
            joinTime: Date.parse($scope.staffData.joinTime)
        };
        $http.post("/manageCenter/addStaff", options).success(function(data){
            reload("add-staff");
        });

    }

});
