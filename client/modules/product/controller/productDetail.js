'use strict';

app.controller('ProductDetailCtrl',function($scope, $rootScope, Product, ProductSvc, prod, $sce){
    $scope.init = function(){
        $scope.prod = angular.copy(prod);
    }

    $scope.displayFullDescription = function(description){
        return $sce.trustAsHtml(description);
    }
})
