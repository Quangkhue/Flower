'use strict';

app.controller("ProductListCtrl", function($scope, $rootScope, ProductSvc, AlertSvc){
    $scope.init = function(){
        initPaging();
        $scope.go2Page(1);
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

    $scope.go2Page = function(page){
        $scope.currentPage = page;
        getProductsByPage(page);
    }

    $scope.getRange = function(){
        var max = $scope.currentPage + 3;
        if (max > $scope.totalPage) max = $scope.totalPage;
        var min = $scope.currentPage - 3;
        if(min < 1) min = 1;
        var range =  _.range(min, max + 1);
        return range;
    }

    function initPaging(){
        ProductSvc.count().then(function(count){
            $scope.totalPage = Math.round(count / PAGING_INFO.Product.itemsPerPage);
            console.log("Total page: ", $scope.totalPage);
        });
    }

    function getProductsByPage(page){
        ProductSvc.getProducts({page: page}).then(function(result){
            $scope.products = angular.copy(result);
        });
    }
});
