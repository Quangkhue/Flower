'use strict';
var app = angular.module("Flower", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
      abstract: true,
      views: {
          root: {
              templateUrl: "/layout/layout.html",
              controller: "MainCtrl"
          }
      }
  }).state('app.home', {
      templateUrl: "/modules/home/views/home.html",
      controller: "HomeCtrl",
      url: "/home"
  });

  $urlRouterProvider.otherwise('/home');
});
