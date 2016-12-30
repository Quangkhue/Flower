'use strict';

app.controller("ProductDetailCtrl", function($scope, $rootScope, Product, prod, ProductSvc, CategorySvc, FileUploadSvc, AlertSvc){
    console.log("Product detail ctrl: ", prod);

    $scope.init = function(){
        initCategories();
        $scope.prod = prod ? angular.copy(prod) : new Product();
        console.log($scope.prod);
        var uploaders = ['imageUploader'];
        FileUploadSvc.initUploader($scope, uploaders);
    };

    $scope.removeAttachedFile = function(index){
        $scope.prod.imgUrls.splice(index, 1);
    };

    $scope.displayImgName = function(path){
        var temp = path.split("/");
        return temp[temp.length - 1];
    }

    $scope.cancel = function(){
        $scope.goToPage('app.product');
    };

    $scope.save = function(){
        if($scope.imageUploader.queue.length){
            FileUploadSvc.uploadAll(function(){
                doSaveProduct();
            }, function(fileItem, response, status, headers){
                $scope.prod.imgUrls.push(response);
            }, $scope.imageUploader)
        } else {
            doSaveProduct();
        }
    }

    function doSaveProduct(){
        if($scope.prod.id){
            // update prod
            console.log("update product");
            ProductSvc.update($scope.prod).then(function(result){
                $scope.goToPage('app.product');
            });
        } else {
            // create prod
            console.log("create product");
            ProductSvc.create($scope.prod).then(function(result){
                $scope.goToPage('app.product');
            });
        }
    }

    function initCategories(){
        CategorySvc.getCategories().then(function(cats){
            $scope.cats = angular.copy(cats);
        })
    };
})
