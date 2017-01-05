'use strict';

app.controller("ProductCtrl", function($scope, $rootScope, ProductSvc, $stateParams){
    $scope.init = function(){
        $scope.catId = $stateParams.catId;
        $scope.products = [];
    }

    $scope.count = function(){
        return ProductSvc.count();
    }

    $scope.getProductsByPage = function(page){
        ProductSvc.getProductByCats([$scope.catId], page).then(function(result){
            $scope.products = angular.copy(result);
        });
    }
});
