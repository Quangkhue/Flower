'use strict';
app.controller('MainCtrl', function($scope, $rootScope, $state, CategorySvc, ProductSvc){
    console.log("Main ctrl!");

    $scope.$state = $state;
    $rootScope.notShowSideBar = ["app.home", "app.contact"];

    $scope.goToPage = function(stateName, params){
        $state.go(stateName, params);
    }

    $scope.getCategories = function(){
        CategorySvc.getCategories().then(function(cats){
            $rootScope.categories = angular.copy(cats);
        });
    }

    $scope.getCategories();
    ProductSvc.getTopProds().then(function(res){
        $rootScope.topProds = angular.copy(res);
    })
});
