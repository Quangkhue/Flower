'use strict';

app.controller("ProductDetailCtrl", function($scope, $rootScope, prod, ProductSvc, CategorySvc){
    console.log("Product detail ctrl: ", prod);

    $scope.init = function(){
        $scope.prod = prod ? angular.copy(prod) : {};
        initCategories();
    }

    function initCategories(){
        CategorySvc.getCategories().then(function(cats){
            $scope.cats = angular.copy(cats);
        })
    }
})
