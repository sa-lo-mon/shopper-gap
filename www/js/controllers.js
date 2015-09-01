'use strict';

var appControllers = angular.module('myApp.appControllers', ['ngRoute', 'checklist-model']);

appControllers.controller('LoginCtrl', ['$scope', '$http', '$location', '$window',
    'userService', function ($scope, $http, $location, $window, userService) {
        $scope.formData = {};

        FB.init({
            appId: '421262201393188',
            channelUrl: 'app/channel.html',
            status: true,
            cookie: true,
            xfbml: true
        });

        /* if ($scope.user.model.isLoggedIn) {
         $location.path('/main');
         return;
         }
         */
        $scope.sub = function () {
            console.log('form data: ', $scope.formData);

            $http.post('/login', $scope.formData)
                .success(function (data) {
                    userService.loginRedirect(data);
                })
                .error(function (data) {
                    console.error('error in posting ', data);

                    //TODO: show error message
                });
        };

        $scope.logout = function () {

            userService.logout();

            FB.getLoginStatus(function (res) {
                if (res.status === 'connected') {
                    FB.logout(function (res) {
                        console.log('facebook logged out!');
                    });
                }
            });

            $location.path('/login');
        };
    }]);

appControllers.controller('RegisterCompleteCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.sub = function () {
        $http.post('/register/complete', $scope.formData)
            .success(function (data) {

                console.log('posted successfully ', data);

                //redirect to 'categories' page
                $location.path('/categories');
            })
            .error(function (err) {
                console.error('error in posting registration details: ', err);
                //TODO: show error message
            });
    }
}]);

appControllers.controller('CategoriesCtrl', ['$scope', '$http', '$location', 'userService', function ($scope, $http, $location, userService) {
    $scope.user = userService;

    $http.get('/categories')
        .success(function (categories) {
            $scope.categories = categories.data;
        })
        .error(function (err) {
            console.error('error in getting categories: ', err);

            //TODO: show error message to user
        });

    $scope.userCategories = [];

    $scope.getCategories = function () {
        return $scope.userCategories;
    };

    $scope.check = function (value, checked) {
        var idx = $scope.userCategories.indexOf(value);

        if (idx >= 0 && !checked) {
            $scope.userCategories.splice(idx, 1);
        }

        if (idx < 0 && checked) {
            $scope.userCategories.push(value);
        }
    };

    $scope.sub = function () {
        var params = {
            email: $scope.user.model.email,
            categories: $scope.userCategories
        };

        $http.post('/categories/complete', params)
            .success(function (data) {

                //redirect to 'main' page
                $location.path('/main');
            })
            .error(function (data) {
                console.error('error in posting categories/complete ', data);

                //TODO: show error message to user

            });
    };
}]);

appControllers.controller('MainCtrl', ['$scope', '$http', 'userService', function ($scope, $http, userService) {

//TODO: implement this!

}]);

appControllers.controller('AccountCtrl', ['$scope', '$http', 'userService', function ($scope, $http, userService) {

//TODO: implement this!

}]);

appControllers.controller('SalesCtrl', ['$scope', '$http', 'userService', function ($scope, $http, userService) {

//TODO: implement this!

}]);

appControllers.controller('MallCtrl', ['$scope', '$http', 'userService', function ($scope, $http, userService) {

//TODO: implement this!

}]);
