var app = angular.module('promiseApp', [])
    .controller('PromiseCtrl', ['$scope', '$q', function ($scope, $q) {
        $scope.greeting = 'Welcome to the world of Promises!';
        var notifications = 0,
         getTShirt = function(isValidUser) {
                var deferred = $q.defer();
                setTimeout(function () {
                    deferred.notify('Notifying');
                    if (isValidUser) {
                        deferred.resolve({
                            'brand': 'HRX',
                            price: 400,
                            status: 'success'
                        });
                    } else {
                        deferred.reject({
                            status: 'error'
                        });
                    }
                }, 2000);
                return deferred.promise;
            };

        var isUserValidated = true,
            validPromiseObject = getTShirt(isUserValidated, true);

        // pattern 1
        validPromiseObject
            .then(
                // on success...
                function (result) {
                    console.log(result);
                },
                // on failure...
                function (errorMsg) {
                    console.log(errorMsg);
                },
                // notify...
                function (percentage) {
                    console.log(percentage);
                }
            );
            
        
        // pattern 2
        // Getting an error   
        var invalidPromiseObject = getTShirt(isUserValidated = false);

        invalidPromiseObject
            .then(function (res) {
                console.info(res);
            })
            .catch(function (err) {
                console.error(err)
            })
            .finally(function(){
                console.info('I will execute finally');
            });

    }]);