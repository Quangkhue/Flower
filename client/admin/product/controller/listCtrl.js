'use strict';

app.controller("ProductListCtrl", function($scope, $rootScope, ProductSvc){
    $scope.init = function(){
        ProductSvc.getProducts().then(function(result){
            $scope.products = angular.copy(result);
            console.log("Products: ", $scope.products);
        });
    }

    $scope.edit = function(prod){
        console.log("edit prod: ", prod);
        $scope.goToPage('app.product-detail', {id: prod.id});
    }

    $scope.delete = function(prodId, index){
        console.log("Cat id: ", prodId);
        ProductSvc.delete(prodId).then(function(res){
            console.log("Delete product response: ", res);
            $scope.products.splice(index, 1);
        });
    }

    $scope.displayCatName = function(cats){
        return cats.map(function(c){
            return c.name
        }).join(", ");
    }

    $scope.addNew = function(){
        console.log("Add new product");
    }
});
