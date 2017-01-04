'use strict';

app.controller("ProductListCtrl", function($scope, $rootScope, ProductSvc, AlertSvc){
    $scope.init = function(){
        $scope.products = [];
    }

    $scope.edit = function(prod){
        console.log("edit prod: ", prod);
        $scope.goToPage('app.product-detail', {id: prod.id});
    }

    $scope.delete = function(prodId, index){
        AlertSvc.showConfirm("",  "", function(){
            ProductSvc.delete(prodId).then(function(res){
                $scope.products.splice(index, 1);
                AlertSvc.showSuccessMsg("Success", "Delete product success");
            });
        })
    }

    $scope.displayCatName = function(cats){
        return cats.map(function(c){
            return c.name
        }).join(", ");
    }

    $scope.addNew = function(){
        $scope.goToPage('app.product-detail');
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
