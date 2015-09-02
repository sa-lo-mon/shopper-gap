'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute', 'myApp.appControllers', 'myApp.appServices']);


app.config(['$httpProvider', function ($httpProvider) {

    $httpProvider.interceptors.push(function ($q) {
        return {
            'request': function (config) {
                var url = config.url;

                //if url doesn't contains '.html'
                if (url.indexOf('.html') == -1) {
                    config.url = 'https://shopper-server.herokuapp.com' + config.url;
                    console.log('config url: ', config.url);
                }

                return config || $q.when(config);
            }
        }
    });
}]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/logout', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterCompleteCtrl'
        })
        .when('/categories', {
            templateUrl: 'views/categories.html',
            controller: 'RegisterCompleteCtrl'
        })
        .when('/main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/sales/general', {
            templateUrl: 'views/sales.html',
            controller: 'SalesCtrl'
        })
        .when('/sales/private', {
            templateUrl: 'views/sales.html',
            controller: 'SalesCtrl'
        })
        .when('/mall/map', {
            templateUrl: 'views/mall.html',
            controller: 'MallCtrl'
        })
        .when('/account', {
            templateUrl: 'views/account.html',
            controller: 'AccountCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);

app.run(['$rootScope', '$window', 'userService', function ($rootScope, $window, userService) {
    $rootScope.user = userService.model;
    $window.fbAsyncInit = function () {
        // Executed when the SDK is loaded

        FB.init({
            appId: '421262201393188',
            channelUrl: 'www/channel.html',
            status: true,
            cookie: true,
            xfbml: true
        });

        userService.watchLoginChange();
    };

    // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

    (function (d) {
        // load the Facebook javascript SDK

        var js,
            id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "https://connect.facebook.net/en_US/all.js";

        ref.parentNode.insertBefore(js, ref);

    }(document));
}]);

