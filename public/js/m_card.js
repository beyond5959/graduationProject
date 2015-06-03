var app = angular.module("app", []);
app.controller("mcardCtrl", function($scope,$http) {

    $scope.cardData = {
        name:"",
        discount:"",
        cardType:"",
        price:"",
        expireTime:"",
        doCard:{
            id:"",
            name:"",
            discount:"",
            cardType:"",
            price:"",
            expireTime:""
        }
    };
    function reload(modalName){
        window.location.href = window.location.href;
        $("." + modalName).modal('hide');
    }

    $scope.sendZhekou = function(num, type){
        $scope.cardData.discount = num;
        $scope.cardData.cardType = type;
        $scope.cardData.doCard.discount = num;
        $scope.cardData.doCard.cardType = type;
    };

    $scope.addCard = function(){
        var options = {
            name: $scope.cardData.name,
            discount: $scope.cardData.discount,
            price: $scope.cardData.price,
            expireTime: $scope.cardData.expireTime,
            cardType: $scope.cardData.cardType
        };
        $http.post("/manageCenter/addCard", options).success(function(data){
            reload("add-card");
        });
    };

    $scope.translate = function(id,name,price,expireTime,discount,cardType){
        $scope.cardData.doCard.id = id;
        $scope.cardData.doCard.name = name;
        $scope.cardData.doCard.discount = discount;
        $scope.cardData.doCard.cardType = cardType;
        $scope.cardData.doCard.price = price;
        $scope.cardData.doCard.expireTime = expireTime;
        $("#card_name").html(name);
    };

    $scope.deleteCard = function(){
        $http.get("/manageCenter/deleteCard/" + $scope.cardData.doCard.id).success(function(data){
            reload("del-card");
        })
    };

    $scope.updateCard = function(){
        var options = {
            id: $scope.cardData.doCard.id,
            name: $scope.cardData.doCard.name,
            discount: $scope.cardData.doCard.discount,
            cardType: $scope.cardData.doCard.cardType,
            price: $scope.cardData.doCard.price,
            expireTime: $scope.cardData.doCard.expireTime
        };
        $http.post("/manageCenter/updateCard", options).success(function(data){
            reload("update-card");
        });
    }


});
