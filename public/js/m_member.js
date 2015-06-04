var app = angular.module("app", []);
app.controller("memberCtrl", function($scope,$http) {

    $scope.memberData = {
        name:"",
        mobilePhone:"",
        gender:"",
        cardName:"",
        applyDate: "",
        doMember:{
            id:"",
            name:"",
            mobilePhone:"",
            gender:"",
            applyDate:"",
            cardName:""
        }
    };

    if(location.href.indexOf('manageCenter') != -1){
        $(".nav li:eq(2)").addClass("active");
    }

    function reload(modalName){
        window.location.href = window.location.href;
        $("." + modalName).modal('hide');
    }

    $scope.sendCard = function(id, discount, card_type, price, name){
        $scope.memberData.cardName = name;
        $("#money").html("需要支付<span class='text-danger'>￥" + price + "元</span>");
    };

    $scope.sendInfo = function(id,name,mobiel_phone,gender,times,card){
        $scope.memberData.doMember.id = id;
        $scope.memberData.doMember.name = name;
        $scope.memberData.doMember.mobilePhone = mobiel_phone;
        $scope.memberData.doMember.gender = gender;
        $scope.memberData.doMember.applyDate = times;
        $scope.memberData.doMember.cardName = card;
        $("#member_name").html(name);
    };
    $scope.updateMember = function(){
        var options = {
            id: $scope.memberData.doMember.id,
            name: $scope.memberData.doMember.name,
            mobilePhone: $scope.memberData.doMember.mobilePhone,
            gender: $scope.memberData.doMember.gender,
            applyDate: Date.parse($scope.memberData.doMember.applyDate)
        };
        $http.post("/manageCenter/updateMember", options).success(function(data){
            reload("update-member");
        });
    };
    $scope.deleteMember = function(){
        $http.get("/manageCenter/deleteMember/" + $scope.memberData.doMember.id).success(function(data){
            reload("del-member");
        });
    };
    $scope.addMember = function(){

        var options = {
            name: $scope.memberData.name,
            mobilePhone: $scope.memberData.mobilePhone,
            gender: $scope.memberData.gender,
            cardName: $scope.memberData.cardName,
            applyDate: Date.parse($scope.memberData.applyDate)
        };
        $http.post("/manageCenter/addMember", options).success(function(data){
            reload("add-member");
        });

    };

});

