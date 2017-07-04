var app = angular.module('promiseApp', [])
    .controller('PromiseCtrl', ['$scope', '$q','$http', function ($scope, $q, $http) {
        $scope.greeting = 'Welcome to the world of Promises!';
        var promise1 = $http.get('../data/color.json'),
            promise2 = $http.get('../data/data1.json'),
            promise3 = $http.get('../data/data2.json');

        $q.all([promise1, promise2, promise3])
        .then(function(result){
            console.info('1st Promise data :',result[0]);
            console.info('2nd Promise data :',result[1]);
            console.info('3rd Promise data :',result[2]);
        })
        .catch(function(err){
            console.error('Error is resolving promise');
        });
}]);