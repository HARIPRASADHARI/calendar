var app = angular.module('calendar', ['ui.calendar'])
app.controller('calendarCtrl', ['$scope','$http', function($scope,$http){
    days = [{"Sunday":0},{"Monday":1},{"Tuesday":2},{"Wednesday":3},{"Thursday":4},{"Friday":5},{"Saturday":6}]
    $scope.eventSources = []

    $scope.eventsData = function(data) {
        $http({
            url: 'http://13.126.66.56/api/test/get_schedules/',
            method: "POST",
            data: data
        })
        .then(function(res) {
            events = []
            angular.forEach(res.data.schedule, function(value, key){
                daysArr = []
                angular.forEach(value.days, function(day, index){
                    angular.forEach(days, function(val, key){
                        if (day == Object.keys(val)[0]){
                            daysArr.push(key)
                        }
                    })  
                })
                event = {
                    title: value.name,
                    start: value.start_time,
                    end: value.end_time,
                    dow: daysArr
                }
                events.push(event)
            });
            angular.copy([events], $scope.eventSources)
            console.log($scope.eventSources)
        }, 
        function(err) { 
            console.log("Error")
        });
    }
    $scope.navClick = function( date, jsEvent, view){
        params = { "month": date.title.split(" ")[0], "year": date.title.split(" ")[1] }
        $scope.eventsData(params)
    };
    $scope.uiConfig = {
      calendar:{
        viewRender: $scope.navClick
      }
    };
}])