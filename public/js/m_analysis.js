//var app = angular.module("app", []).config(function($interpolateProvider){
//        $interpolateProvider.startSymbol('[[').endSymbol(']]');
//    }
//);
//app.controller("manalysisCtrl", function($scope,$http) {
//
//    function reload(modalName){
//        window.location.href = window.location.href;
//        $("." + modalName).modal('hide');
//    }
//
//
//    var ctx = $("#myChart").get(0).getContext("2d");
//    var ctxPie = $("#myPie").get(0).getContext("2d");
//
//    $http.get("/manageCenter/queryAllJieSuanItem").success(function(datas){
//        var data = {
//            labels : datas.result.names,
//            datasets : [
//                {
//                    fillColor : "rgba(151,187,205,0.5)",
//                    strokeColor : "rgba(151,187,205,1)",
//                    data : datas.result.counts
//                }
//            ]
//        };
//        var options = {
//            scaleStepWidth:20
//        };
//        new Chart(ctx).Bar(data,options);
//    });
//
//    $http.get("/manageCenter/queryAllPayType").success(function(datas){
//        var data = datas.result;
//        var options = {};
//        new Chart(ctxPie).Pie([{value:1,color:"#F7464A"}], options);
//    });
//
//
//
//
//});


$(function(){
    if(location.href.indexOf('manageCenter') != -1){
        $(".nav li:eq(2)").addClass("active");
    }
    var ctx = $("#myChart").get(0).getContext("2d");
    var ctxPie = document.getElementById("pieChartCanvas").getContext("2d");
    var ctx2 = $("#tcChart").get(0).getContext("2d");
    var ctypePie = document.getElementById("c_pieChartCanvas").getContext("2d");

    init();
    function init(){
        $.get("/manageCenter/queryAllJieSuanItem", function(datas,status){
            var data = {
                labels : datas.result.names,
                datasets : [
                    {
                        fillColor : "rgba(151,187,205,0.5)",
                        strokeColor : "rgba(151,187,205,1)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data : datas.result.counts
                    }
                ]
            };
            var options = {
                scaleStepWidth:20,
                animation : Modernizr.canvas
            };
            new Chart(ctx).Bar(data,options);
        });
    }
    $('a[id="itemss"]').on('shown.bs.tab', function (e) {
        init();
    });

    $('a[id="payType"]').on('shown.bs.tab', function (e) {
        $.get("/manageCenter/queryAllPayType", function(d, status){
            var data = d.result;
            var options = {
                animation : Modernizr.canvas
            };
            new Chart(ctxPie).Pie(data, options);
        });
    });
    $('a[id="c_type"]').on('shown.bs.tab', function (e) {
        $.get("/manageCenter/queryCustomerType", function(d, status){
            var data = d.result;
            var options = {
                animation : Modernizr.canvas
            };
            new Chart(ctypePie).Pie(data, options);
        });
    });
    $('a[id="ygtc"]').on('shown.bs.tab', function (e) {
        $.get("/manageCenter/queryAllYGTC", function(d, status){
            var data = {
                labels: d.result.names,
                datasets: [
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: d.result.amount
                    }
                ]
            };
            console.log(d.result.amount);
            var options = {
                animation : Modernizr.canvas
            };
            new Chart(ctx2).Bar(data, options);
        });
    });

});