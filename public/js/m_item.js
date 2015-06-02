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

    function reload(modalName){
        window.location.href = window.location.href;
        $("." + modalName).modal('hide');
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
