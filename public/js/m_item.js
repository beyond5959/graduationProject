var app = angular.module("app", []);
app.controller("mitemCtrl", function($scope,$http){
    $scope.cateData = {
        newCate:"",
        cates:[],
        addCate:[],
        updateCate:{
            id:"",
            name:""
        },
        addItem:{
            name:"",
            price:"",
            picUrl:""
        }
    };
    $scope.itemData = {
        id:"",
        name:"",
        price:""
    };

    function reload(modalName){
        window.location.href = window.location.href;
        $("." + modalName).modal('hide');
    }

    if(location.href.indexOf('manageCenter') != -1){
        $(".nav li:eq(2)").addClass("active");
    }

    $scope.addCate = function(){
        var cateName = $scope.cateData.newCate;
        $http.get("/manageCenter/addCate/" + cateName).success(function(data){
            reload("add-cate");
        });
    };

    $scope.sendId = function(id,name){
        $scope.cateData.updateCate.name = name;
        $scope.cateData.updateCate.id = id;
        $(".delCateName").html(name);
    };

    $scope.updateCate = function(){

        $http.post("/manageCenter/updateCate", {id:$scope.cateData.updateCate.id, name:$scope.cateData.updateCate.name}).success(function(data){
            reload("update-cate");
        });
    };

    $scope.deleteCate = function(){
        $http.get("/manageCenter/deleteCate/" + $scope.cateData.updateCate.id).success(function(data){
            reload("del-cate");
        });
    };

    $scope.addItem = function(){
        var picUrl = $("#itemUrl").val();
        var options = {
            itemName: $scope.cateData.addItem.name,
            itemPrice: $scope.cateData.addItem.price,
            picUrl: picUrl,
            serviceId: $scope.cateData.updateCate.id,
            serviceName: $scope.cateData.updateCate.name
        };
        $http.post("/manageCenter/addItem",options).success(function(data){
            reload("add-item");
        });

    };

    $scope.translate = function(itemId, itemName, itemPrice){
        $scope.itemData.name = itemName;
        $scope.itemData.id = itemId;
        $scope.itemData.price = itemPrice;
    };

    $scope.updateItem = function(){
        var options = {
            id: $scope.itemData.id,
            name: $scope.itemData.name,
            price: $scope.itemData.price
        };
        $http.post("/manageCenter/updateItem", options).success(function(data){
            reload("update-item");
        });
    };

    $scope.deleteItem = function(){
        $http.get("/manageCenter/deleteItem/" + $scope.itemData.id).success(function(data){
            reload("del-item");
        });
    };

    $("#fieldPhoto").fileupload({
        dataType: "json",
        done: function(e, data){
            $(".btn-file").remove();
            var picUrl = data.result.files[0].url.substring(21);
            $(".uploads").append('<span class="input-group-addon">图片地址：</span>'+
            '<input id="itemUrl" type="text" class="form-control" aria-describedby="basic-addon1" ng-model="cateData.addItem.picUrl" readonly value="'+ picUrl +'">');
        }
    });

});
