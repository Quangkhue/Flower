'use strict';
app.controller('MainCtrl', function($scope, $http, $rootScope, $state, $cookies){
    var token = $cookies.get('token');

    if(!token){
        $state.go('login');
    } else {
        $scope.isAuthentication = true;
        $http.defaults.headers.common.Authentication = token;
    }

    $scope.$state = $state;
    $scope.goToPage = function(stateName, params){
        $state.go(stateName, params);
    }

    $scope.logout = function(){
        $cookies.remove('token');
        $scope.goToPage('login');
    }
});
