angular.module('errorHandlerModule', [])
    .service('errorHandlerSvc', ['$q', function ($q) {
        return {
            request: function (config) {
                console.info('Req Url', config.url);
                return config;
            },
            'response': function (response) {
                // do something on success
                return response;
            },
            'requestError': function (rejection) {
                // do something on error
                // if (canRecover(rejection)) {
                //     return responseOrNewPromise
                // }
                return $q.reject(rejection);
            },
            responseError: function (response) {
                switch (response.status) {
                    case 403:
                        console.error(`Forbidden: You don't have permission to access directoryon this serve`);
                        break;
                    case 401:
                        console.error('UnAuthorized access');
                        break;
                    case 404:
                        console.error('Resource Not Found');
                        break;

                }

                return $q.reject(response);
            }
        };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('errorHandlerSvc');
    }])
    .name;