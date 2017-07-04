var app = angular.module('httpApp', [])
    .controller('HttpCtrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.greeting = 'Welcome to $http';
        var dataPromise = DataService.getData('../data/color.json');
        dataPromise
        .then(function(res){
            console.info('Data received', res);
        })
        .catch(function(err){
            console.error('error occurred', err);
        });
    }])
    .factory('DataService', ['$http', function ($http) {
        return {
            getData: function (url) {
                return $http({
                    method: 'GET',
                    url: url,
                    cache: true
                }).then(function (data) {
                    return resp;
                }).catch(function (err) {
                    console.error('data not found. Error code:', err);
                    return err;
                });

            }
        }


    }]);