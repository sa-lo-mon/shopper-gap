var appServices = angular.module('myApp.appServices', []);

appServices.factory('userService', ['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
    var service = {
        model: {
            name: '',
            email: '',
            isLoggedIn: false
        },

        saveState: function () {
            sessionStorage.userService = angular.toJson(service.model);
        },

        restoreState: function () {
            service.model = angular.fromJson(sessionStorage.userService);
        },

        watchLoginChange: function () {
            var _self = this;
            FB.Event.subscribe('auth.statusChange', function (res) {
                if (res.status === 'connected') {
                    var userId = res.authResponse.userID;
                    var token = res.authResponse.accessToken;
                    _self.getUserInfo(userId, token);

                } else {
                    _self.logout();
                    console.log('not logged-in!');
                    $location.path('/login');
                }
            });
        },

        getUserInfo: function (userID, token) {
            var _self = this;
            $rootScope.$apply(function () {

                $http.get('/login' + '/' + userID + '/' + token)
                    .success(function (data) {
                        _self.loginRedirect(data);
                    })
                    .error(function (err) {
                        console.log('user info error: ', err);
                    });
            });
        },

        logout: function () {
            var _self = this;
            _self.model.email = '';
            _self.model.name = '';
            _self.model.isLoggedIn = false;
            _self.saveState();
        },

        loginRedirect: function (data) {
            var _self = this;
            if (!data || !data.data) {
                $location.path('/login');
                return;
            }

            _self.model.email = data.data.email || data.data.data.email;
            _self.model.name = data.data.FirstName || data.data.data.FirstName;
            _self.model.isLoggedIn = true;
            _self.saveState();

            var path = '/login';
            var userCategories = data.data.Categories || data.data.data.Categories;
            if (userCategories && userCategories.length > 0) {

                //redirect to "main" page!
                path = '/main';
            } else {

                //redirect to "categories" page!
                path = '/categories';
            }

            $location.path(path);
        }
    };

    $rootScope.$on('savestate', service.saveState);
    $rootScope.$on('restorestate', service.restoreState);

    return service;
}])
;
