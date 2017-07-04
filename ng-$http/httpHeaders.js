var app = angular.module('httpApp', ['errorHandlerModule'])
    .controller('HttpCtrl', ['$scope', 'DataService','errorHandlerSvc',
     function ($scope, DataService, errorHandlerSvc) {
        $scope.greeting = 'Welcome to $http';
        var dataPromise = DataService.getTransformedData('../data/data1.json');
        dataPromise
            .then(function (res) {
                console.info('Data received', res);
            })
            .catch(function (err) {
                console.error('Error retrieving data');
            });


    }])
    .factory('DataService', ['$http', function ($http) {
        return {
            getData: function (url) {
                return $http({
                    method: 'GET',
                    url: url
                }).then(function (resp) {
                    return resp.data;
                }).catch(function (err) {
                    return err;
                });

            },
            getTransformedData: function (url) {
                return $http({
                    method: 'GET',
                    url: url,
                    transformResponse: appendTransform($http.defaults.transformResponse, function (value) {
                        return transformData(value);
                    })
                }).then(function (resp) {
                    return resp.data;
                }).catch(function (err) {
                    return err;
                });
            }
        }

    }]);

//configure headers in run phase
app.run(function ($http) {
    $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
});

//Appending transform
function appendTransform(defaults, transform) {

    // We can't guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    // Append the new transformation to the defaults
    return defaults.concat(transform);
}

//Transforming response
function transformData(data) {
    if(data.id && typeof data.id === 'string'){
        data.id = new Number(data.id);
    }
    return data;

}
