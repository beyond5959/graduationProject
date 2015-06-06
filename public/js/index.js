var app = angular.module("app", []).config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }
);

app.controller("indexCtrl", function($scope,$http) {
    $(".nav li:eq(0)").addClass("active");
    function reload(modalName){
        window.location.href = window.location.href;
        $("." + modalName).modal('hide');
    }

    $scope.itemData = {
        isShow: false,
        items:[],
        JsItems:[],
        sumMoney:0,
        type:"散客",
        memberId:"",
        memberName:"",
        cardName:"",
        cardDiscount:1.00,
        payType:"",
        tc:0,
        tc_staff:"",
        tc_id:"",
        sq:0,
        zl:0,
        oldMoney:""
    };
    $(".nav-item li:eq(0)").addClass("active");
    $scope.changeNavService = function(id, index){
        $(".nav-item li").removeClass("active");
        $(".nav-item li:eq(" + index + ")").addClass("active");
        $http.get("index/getItemsByServiceId/" + id).success(function(data){
            $scope.itemData.isShow = true;
            $scope.itemData.items = data.result;
        });
        $(this).addClass("active");
    };

    $scope.addJsItem = function(data){
        $scope.itemData.JsItems.push(data);
        $scope.itemData.sumMoney = $scope.itemData.sumMoney + parseFloat(data.price);
    };
    $scope.qingkong = function(){
        $scope.itemData.JsItems = [];
        $scope.itemData.sumMoney = 0;
        $scope.itemData.type = "散客";
        $("#type").html("散客");
    };
    $scope.delJsItem = function(index){
        $scope.itemData.sumMoney = $scope.itemData.sumMoney - parseFloat($scope.itemData.JsItems[index].price);
        $scope.itemData.JsItems.splice(index, 1);
    };
    $scope.sendMember = function(id, name, cardName, cardDiscount){
        $("#type").html(name);
        $scope.itemData.memberId = id;
        $scope.itemData.memberName = name;
        $scope.itemData.cardName = cardName;
        $scope.itemData.cardDiscount = cardDiscount;
        $scope.itemData.type = "会员";
    };
    $scope.JieSuan = function(){
        if($scope.itemData.type == "散客"){
            $(".sanke").modal("show");
        }else{
            $(".huiyuan").modal("show");
            $scope.itemData.oldMoney = $scope.itemData.sumMoney;
            $scope.itemData.sumMoney = parseFloat($scope.itemData.oldMoney)*parseFloat($scope.itemData.cardDiscount);
            $scope.itemData.sumMoney = parseFloat($scope.itemData.sumMoney.toFixed(1));
        }
    };
    $scope.huanyuan = function(){
        $scope.itemData.sumMoney = $scope.itemData.oldMoney;
    };
    $scope.sendStaff = function(id,name){
        $scope.itemData.tc_staff = name;
        $scope.itemData.tc_id = id;
    };
    $scope.$watch("itemData.sq", function(newVal, oldVal){
        if(newVal == oldVal){return;}
        $scope.itemData.zl = newVal - $scope.itemData.sumMoney;
    });

    $scope.addJieSuan = function(){
        var options = {
            type:$scope.itemData.type,
            member_name:$scope.itemData.memberName,
            member_id:$scope.itemData.memberId,
            sum_money:$scope.itemData.sumMoney,
            items:$scope.itemData.JsItems,
            staff_name:$scope.itemData.tc_staff,
            staff_id:$scope.itemData.tc_id,
            tc_money:$scope.itemData.tc,
            pay_type:$scope.itemData.payType
        };
        $http.post("/index/addJieSuan", options).success(function(data){
            reload("sanke");
        });
    }
});
