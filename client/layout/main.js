'use strict';
app.controller('MainCtrl', function($scope, $rootScope, $state){
    console.log("Main ctrl!");
    console.log("hahaha");

    $scope.$state = $state;
    $rootScope.notShowSideBar = ["app.home", "app.contact"];
});
