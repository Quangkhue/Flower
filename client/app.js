'use strict';
var app = angular.module("Flower", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        abstract: true,
        views: {
            root: {
                templateUrl: "/layout/layout.html",
                controller: "MainCtrl"
            }
        }
    })
        .state('app.home', {
            templateUrl: "/modules/home/views/home.html",
            controller: "HomeCtrl",
            url: "/home"
        })
        .state('app.contact', {
            templateUrl: "/modules/contact/views/contact.html",
            url: "/contact"
        })
        .state('app.about', {
            templateUrl: "/modules/about/views/about.html",
            url: "/about"
        })
        .state('app.product', {
            templateUrl: "/modules/product/views/list_Product.html",
            url: "/product"
        });

    $urlRouterProvider.otherwise('/home');
});
