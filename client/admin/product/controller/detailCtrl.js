'use strict';

app.controller("ProductDetailCtrl", function($scope, $rootScope, prod, ProductSvc, CategorySvc, FileUploadSvc){
    console.log("Product detail ctrl: ", prod);

    $scope.init = function(){
        initCategories();
        $scope.prod = prod ? angular.copy(prod) : {};
        var uploaders = ['imageUploader'];
        FileUploadSvc.initUploader($scope, uploaders);
    };

    $scope.removeAttachedFile = function(index){
        $scope.prod.imgUrls.splice(index, 1);
    };

    $scope.cancel = function(){
        $scope.goToPage('app.product');
    };

    $scope.save = function(){
        if($scope.prod.id){
            // update prod
            console.log("Update product");
        } else {
            // create prod
            console.log("Create product");
        }
    }

    function initCategories(){
        CategorySvc.getCategories().then(function(cats){
            $scope.cats = angular.copy(cats);
        })
    };
})
