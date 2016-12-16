'use strict';
var app = angular.module("Flower", ['ui.router']);

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
            views: {
                'contents': {
                    templateUrl: "/modules/home/views/home.html",
                    controller: "HomeCtrl",
                },
                 'sidebars': {}
            },
            url: "/home"
        })
        .state('app.contact', {
            templateUrl: "/modules/contact/views/contact.html",
            url: "/contact"
        })
        .state('app.about', {
            templateUrl: "/modules/about/views/about.html",
            url: "/about"
        });

    $urlRouterProvider.otherwise('/home');
});
