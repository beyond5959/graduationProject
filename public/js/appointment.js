var app = angular.module("app", []);
app.controller("appointmentCtrl", function($scope,$http) {
    if(location.href.indexOf('appointment') != -1){
        $(".nav li:eq(1)").addClass("active");
    }
    function reload(modalName){
        window.location.href = window.location.href;
        $("." + modalName).modal('hide');
    }
    $scope.appData = {
        type:"散客",
        name:"",
        mobilePhone:"",
        staff:"",
        startTime:"",
        endTime:"",
        date:"",
        doApp:{
            id:"",
            delete:""
        }
    };
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        firstDay: 1,
        weekMode: "liquid",
        lang: "zh-cn",
        dayClick: function(date, jsEvent, view){
            $(".add-appointment").modal("show");
            $scope.appData.date = date.format();

        },
        eventMouseover: function(date, jsEvent, view){
            $(this).css('cursor', 'pointer');
            $(this.parent).css('background-color', 'red');

        },
        events: function(start, end, timezone, callback) {
            $http.get("/appointment/queryAllappointment").success(function(data){
                var events = [];
                angular.forEach(data.result, function(d){
                    events.push({
                        id: d.id,
                        title: d.type + d.name + "预约" + d.staff + "-" + d.mobile_phone,
                        start: d.s_time,
                        end: d.e_time
                    });
                });
                callback(events);
            });
        },
        eventClick: function(calEvent, jsEvent, view) {
            $scope.appData.doApp.id = calEvent.id;
            $(".s_time").val(calEvent.start.format("YYYY-MM-DD hh:mm:ss"));
            $(".e_time").val(calEvent.end.format("YYYY-MM-DD hh:mm:ss"));
            $("#title").html(calEvent.title);
            $(".update-appointment").modal("show");
        }
    });

    $(".fc-day").hover(function(){
        $(this).css("cursor", "pointer");
    });

    $scope.sendMember = function(phone, name){
        $scope.appData.mobilePhone = phone;
        $scope.appData.name = name;
    };
    $scope.sendStaff = function(name){
        $scope.appData.staff = name;
    };

    $scope.addApp = function(){
        var h = $scope.appData.startTime.getHours()<10?"0"+$scope.appData.startTime.getHours():$scope.appData.startTime.getHours();
        var m = $scope.appData.startTime.getMinutes()<10?"0"+$scope.appData.startTime.getMinutes():$scope.appData.startTime.getMinutes();
        var s = $scope.appData.startTime.getSeconds()<10?"0"+$scope.appData.startTime.getSeconds():$scope.appData.startTime.getSeconds();
        var s_time = $scope.appData.date+"T"+h+":"+m+":"+s;
        var e_time = "";
        if($scope.appData.endTime&&$scope.appData.endTime!=""){
            var hh = $scope.appData.endTime.getHours()<10?"0"+$scope.appData.endTime.getHours():$scope.appData.endTime.getHours();
            var mm = $scope.appData.endTime.getMinutes()<10?"0"+$scope.appData.endTime.getMinutes():$scope.appData.endTime.getMinutes();
            var ss = $scope.appData.endTime.getSeconds()<10?"0"+$scope.appData.endTime.getSeconds():$scope.appData.endTime.getSeconds();
            e_time = $scope.appData.date+"T"+hh+":"+mm+":"+ss;
        }
        var options = {
            type:$scope.appData.type,
            name:$scope.appData.name,
            mobilePhone:$scope.appData.mobilePhone,
            staff:$scope.appData.staff,
            startTime:s_time,
            endTime:e_time
        };
        $http.post("/appointment/addAppointment", options).success(function(data){
            reload("add-appointment");
        });
    };

    $scope.deleteApp = function(){
        console.log($scope.appData.doApp.id);
        $http.get("/appointment/deleteApp/" + $scope.appData.doApp.id).success(function(data){
            reload("update-appointment");
        });
    };

});