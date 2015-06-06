var app = angular.module("app", []).config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }
);

app.controller("mflowCtrl", function($scope,$http) {

    function reload(modalName){
        window.location.href = window.location.href;
        $("." + modalName).modal('hide');
    }

    if(location.href.indexOf('manageCenter') != -1){
        $(".nav li:eq(2)").addClass("active");
    }

});

