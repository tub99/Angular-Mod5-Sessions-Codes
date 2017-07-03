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
                            brand: 'HRX',
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
            },
            getFinalPrice = function(tShirt) {
                 var deferred = $q.defer();
                setTimeout(function () {
                    deferred.notify('Notifying about final price');
                    if (tShirt.status && tShirt.brand === 'HRX') {
                        deferred.resolve(tShirt.price*.80);
                    } else if(!tShirt.status){
                        deferred.reject({
                            status: 'error'
                        });
                    }
                    else {
                         deferred.resolve(tShirt.price);
                    }
                }, 2000);
                return deferred.promise;
            }

            // Promise Chaining
              var isUserValidated = true,
            validPromiseObject = getTShirt(isUserValidated, true);

        // pattern 1
        validPromiseObject
            .then(function(res) {
                return getFinalPrice(res);
            })
            .then(function(res){
                console.info('Final price is '+res)
            })
            .catch(function(err){
                  console.info('Order not successful',err)
            })


    }]);