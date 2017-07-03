var app = angular.module('httpApp', [])
    .controller('HttpCtrl', ['$scope', 'DataService', function ($scope, DataService) {
        $scope.greeting = 'Welcome to $http';
        var data = DataService.getData('../data/color.json');

    }])
    .factory('DataService', ['$http', function ($http) {
        return {
            getData: function (url) {
               return $http({
                    method: 'GET',
                    url: url
                }).then(function (data) {
                    // this callback will be called asynchronously
                    // when the response is available
                    var resp = JSON.parse(data);
                    console.info(resp);
                    return resp;
                }).catch(function (err) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.error('data not found. Error code:', err);
                    return err;
                });

            }
        }


    }]);