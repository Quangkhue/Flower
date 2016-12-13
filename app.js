'use strict';
var app = angular.module("Flower", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'home.html'
  }).state('faq', {
      url: "/faq",
      templateUrl: 'faq.html'
  });
  
  $urlRouterProvider.otherwise('/home');
});
