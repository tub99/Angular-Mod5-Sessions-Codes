class ErrorHandler {
    constructor($rootScope, $q) {
        'ngInject';

        return {
            responseError: function(response) {
                switch (response.status) {
                    case 403:
                         $rootScope.$broadcast('error-403');
                        break;
                    case 401:
                        $rootScope.$broadcast('error-401');
                        break;
                }

                return $q.reject(response);
            }
        };
    }
}

angular.module('errorHandlerModule', [])
    .service('errorHandlerSvc', ErrorHandler)
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('errorHandlerSvc');
    }])
    .name;
