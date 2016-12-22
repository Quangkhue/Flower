'use strict';

app.controller("CategoryListCtrl", function($scope, $rootScope, CategorySvc){
    console.log("Category list ctrl");

    $scope.init = function(){
        CategorySvc.getCategories().then(function(result){
            $scope.categories = angular.copy(result);
            console.log("Categories: ", $scope.categories);
        });
    }

    $scope.edit = function(cat){
        cat.isEditing = true;
    }

    $scope.delete = function(catId){
        console.log("Cat id: ", catId);
        CategorySvc.delete(catId);
    }

    $scope.save = function(cat){
        console.log("Category: ", cat);
        delete cat.isEditing;
        CategorySvc.update(cat);
    }
})
