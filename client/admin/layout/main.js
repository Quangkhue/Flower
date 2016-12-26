'use strict';
app.controller('MainCtrl', function($scope, $rootScope, $state){
    console.log("Main ctrl!");
    $scope.$state = $state;
    $scope.goToPage = function(stateName, params){
        $state.go(stateName, params);
    }
});
