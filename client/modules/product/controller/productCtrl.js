'use strict';

app.controller("ProductCtrl", function($scope,$rootScope, ProductSvc){
    $scope.init = function(){
        $scope.products = [];
    }

    $scope.goToDetail = function(id){
        console.log("Go to detail page");
    }

    $scope.count = function(){
        return ProductSvc.count();
    }

    $scope.getProductsByPage = function(page){
        ProductSvc.getProducts({page: page}).then(function(result){
            $scope.products = angular.copy(result);
        });
    }
});
